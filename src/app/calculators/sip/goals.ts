import {SipCalcGoal} from "./sip-calc-goal";

export const SipGoals: SipCalcGoal[] = [
    <SipCalcGoal> {
        id: 1,
        name: "Retirement Planning",
        imagePath: "../../../assets/img/sip/calc/retirement.svg",
        xAxisName: 'Age(in Yrs)',
        xToolTip: 'At the age of ',
        yToolTip: ' your corpus will be',
        purpose: 'for a peaceful retirement'
    },
    <SipCalcGoal> {
        id: 2,
        name: "Higher Education",
        imagePath: "../../../assets/img/sip/calc/education.svg",
        xAxisName: 'Time(in Yrs)',
        xToolTip: 'After ',
        yToolTip: ' years your SIP value will be',
        purpose: 'for a better future'
    },
    <SipCalcGoal> {
        id: 3,
        name: "Marriage",
        imagePath: "../../../assets/img/sip/calc/marriage.svg",
        xAxisName: 'Time(in Yrs)',
        xToolTip: 'After ',
        yToolTip: ' years your SIP value will be',
        purpose: 'to start saving early'
    },
    <SipCalcGoal> {
        id: 4,
        name: "Buy a House",
        imagePath: "../../../assets/img/sip/calc/house.svg",
        xAxisName: 'Time(in Yrs)',
        xToolTip: 'After ',
        yToolTip: ' years your SIP value will be',
        purpose: 'to buy a house of your own'
    },
    <SipCalcGoal> {
        id: 5,
        name: "Buy a Vehicle",
        imagePath: "../../../assets/img/sip/calc/car.svg",
        xAxisName: 'Time(in Yrs)',
        xToolTip: 'After ',
        yToolTip: ' years your SIP value will be',
        purpose: 'to buy your desired vehicle'
    },
    <SipCalcGoal> {
        id: 6,
        name: "Other Goal",
        imagePath: "../../../assets/img/sip/calc/other.svg",
        xAxisName: 'Time(in Yrs)',
        xToolTip: 'After ',
        yToolTip: ' years your SIP value will be',
        purpose: 'to save for your future'
    },
];

export const CheckReturns: SipCalcGoal = <SipCalcGoal> {
    id: 1,
    name: "SIP Growth",
    imagePath: "../../../assets/img/sip/calc/returns.svg",
    xToolTip: 'After ',
    yToolTip: ' years your'
};
