import { createAction } from "./util";

const metadata = [
    {
        action: "/Player/EnterPortal",
        name: "notifyLogin",
    },
    {
        action: "/Player/Balance",
        name: "balance",
    },
    {
        action: "/Player/PlaceBet",
        name: "placeBet",
    },
    {
        action: "/Player/EndGame",
        name: "endGame",
    },
    {
        action: "/Player/VoidGame",
        name: "voidGame",
    },
    {
        action: "/Player/EnterPortal",
        name: "enterPortal",
    },
    {
        action: "/Player/HitJackpot",
        name: "hitJackpot",
    },
    {
        action: "/Player/GetBetLimit",
        name: "getBetLimit",
    },
    {
        action: "/Player/Award",
        name: "award",
    },
];

export default (configs) => createAction(metadata, configs);
