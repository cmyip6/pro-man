import { StarRateSharp } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../store";

export type Item ={
    itemId : string, people:string, name: string, color:string
}

type StatusProps ={
    projectId: number
    statesName: string
    itemList: Item[]
}

export function StatusColumn (props: StatusProps) {

    const dispatch = useAppDispatch();
    const name = 

    
    return (
        <>
            <div className="statusColumn">{props.statesName} / {props.itemList.length} </div>

        </>
    )
}