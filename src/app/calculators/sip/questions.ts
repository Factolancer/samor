import {SipCalcQuestion}from "./sip-calc-question";
import {CalculationKeys} from "./calculation-keys";

export const SipGoalQuestions: SipCalcQuestion[][] = [
    [
        //retirement planning
        <SipCalcQuestion>{
            id: 1,
            statement: "What is your current age?",
            prefix: "",
            suffix: " Years",
            min: 18,
            max: 59,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "What is your current monthly expenditure?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 0,
            max: 10000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ],

    [
        //higher education
        <SipCalcQuestion>{
            id: 1,
            statement: "Years to go for higher studies?",
            suffix: " Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "How much would be the required amount for fees and expenses?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 0,
            max: 1000000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ],

    [
        //marriage of a child
        <SipCalcQuestion>{
            id: 1,
            statement: "Years left for marriage?",
            suffix: "Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "Total amount required for the marriage?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 1,
            max: 1000000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ], [
        //Buying a house
        <SipCalcQuestion>{
            id: 1,
            statement: "After how long are you planning to buy a house?",
            suffix: "Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "How much amount do you need to buy the house?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 1,
            max: 1000000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ], [

        //buying a vehicle
        <SipCalcQuestion>{
            id: 1,
            statement: "After how long are you planning to buy a vehicle?",
            suffix: "Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "How much amount do you need buy the vehicle?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 1,
            max: 1000000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ], [
        // others
        <SipCalcQuestion>{
            id: 1,
            statement: "How long will you take to achieve your goal?",
            suffix: "Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "How much amount do you need to achieve this goal?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.amount,
            min: 1,
            max: 1000000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market?",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ]
];


export const SipReturnsQuestions: SipCalcQuestion[] =
    [
        //calculate returns on your SIP questions

        <SipCalcQuestion>{
            id: 1,
            statement: "For how long are you planning to invest?",
            suffix: "Years",
            prefix: "",
            calculationKey: CalculationKeys.years,
            min: 1,
            max: 100,
        },
        <SipCalcQuestion>{
            id: 2,
            statement: "How much do you want to invest monthly on SIP?",
            prefix: "&#x20B9;",
            suffix: "",
            calculationKey: CalculationKeys.principal,
            min: 500,
            max: 10000000,
        },
        <SipCalcQuestion>{
            id: 3,
            statement: "What long term inflation rate do you expect?",
            suffix: "%",
            prefix: "",
            helperText: "Inflation forecast for next 5 years is 4-5%!. Reference: Market Sources.",
            calculationKey: CalculationKeys.inflation,
            min: 0,
            max: 15,
            answer: 5
        },
        <SipCalcQuestion>{
            id: 4,
            statement: "What long term growth rate do you expect in the equity market? ",
            suffix: "%",
            prefix: "",
            helperText: "Long term return from equity market has been 8-15%. Reference: Market Sources.",
            calculationKey: CalculationKeys.rate,
            min: 0,
            max: 100,
            answer: 14
        },
    ];
