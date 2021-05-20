#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float fade(float t) { return t * t * t * (t * (t * 6. - 15.) + 10.); }
vec2 smooth(vec2 x) { return vec2(fade(x.x), fade(x.y)); }

vec2 hash(vec2 co) {
    float m = dot(co, vec2(12.9898, 78.233));
    return fract(vec2(sin(m),cos(m))* 43758.5453) * 2. - 1.;
}

float perlinNoise(vec2 uv) {
    vec2 PT  = floor(uv);
    vec2 pt  = fract(uv);
    vec2 mmpt= smooth(pt);

    vec4 grads = vec4(
        dot(hash(PT + vec2(.0, 1.)), pt-vec2(.0, 1.)),   dot(hash(PT + vec2(1., 1.)), pt-vec2(1., 1.)),
        dot(hash(PT + vec2(.0, .0)), pt-vec2(.0, .0)),   dot(hash(PT + vec2(1., .0)), pt-vec2(1., 0.))
    );

    return mix (mix (grads.z, grads.w, mmpt.x), mix (grads.x, grads.y, mmpt.x), mmpt.y) / 2.;
}

float fbm(vec2 uv) {
    float finalNoise = 0.;
    finalNoise += .50000*perlinNoise(2.*uv);
    finalNoise += .25000*perlinNoise(4.*uv);
    finalNoise += .12500*perlinNoise(8.*uv);
    finalNoise += .06250*perlinNoise(16.*uv);
    finalNoise += .03125*perlinNoise(32.*uv);

    return finalNoise;
}

void main() {
    //gl_FragColor = vec4( vec3( fbm(3.*position) ), 1.0 );

    vec2 p = -.9 + gl_FragCoord.xy / resolution.xy;
    p.x *= resolution.x/resolution.y;
    vec2 position = gl_FragCoord.xy / resolution.y ;

    float color = .5;

    vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);

    for(int i = 1; i <= 7; i++)
    {
        float power = pow(2.0, float(i)) / 10.;
        color += fbm(3.1 *p + vec2(-time*.05 * power, time*.02 * power)) / 1.5;
    }

    gl_FragColor = vec4(color * 0.8, pow(max(color,0.),1.5), max(color,0.) , 0.01);
}