import "../../../assets/css/gameBoard.sass";

import React, { useState } from "react";


export default function Board() {

    let board =[];

    
    /* setting board */
    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {
    
            board.push(
                <Square />
            );
        }
    }
       
    return(
        <>
            <div className="gBoard">{board}</div>
        </>
    );
}

function Square() {
    return(
        <div className="tiles"></div>
    )
}