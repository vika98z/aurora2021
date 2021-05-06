import FuzzyDesicions from "../fuzzy_decisions/main.js";
import Rules from "./rules.js";
import BaseFuzzyFunction from "../fuzzy_decisions/FuzzyLogicFunctions/BaseFuzzyFunction";
import Table from "../fuzzy_decisions/FuzzyLogicFunctions/Table.js";

export default class UsualRules extends Rules{
    constructor() {
        super()
        this.funcs = []
        this.input = []
        for (let i = 0; i<9; i++){
            this.funcs.push(new Table({lBorder: 0, rBorder: 3}));
        }
    }

    getDecision() {
        return this.fuzzyDecider.getDecision(this.input);
    }
}