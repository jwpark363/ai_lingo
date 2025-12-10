import { User } from "./types";

const users:User[] = [
    {id:1, username:"alice"},
    {id:2, username:"bob"},
    {id:3, username:"charlie"},
]

const user_scenarios = [
    {user_id:1, scenario_id:"scenario_1", stage_id:"stage_1", is_completed:true},
    {user_id:1, scenario_id:"scenario_1", stage_id:"stage_2", is_completed:false},
    {user_id:2, scenario_id:"scenario_1", stage_id:"stage_1", is_completed:true},
    {user_id:3, scenario_id:"scenario_2", stage_id:"stage_1", is_completed:false},
];

export {users, user_scenarios};