import React, { useState, useEffect, useRef } from 'react'

type Props = {
    InstructionsData: any,
}

export default function RecipeSteps({ InstructionsData }: Props) {
    const [recipeSteps, setRecipeSteps] = useState<any>([])

    useEffect(() => {
        const parser = new DOMParser();
        let instructionsArray : string[] = [];
        const htmLregex = /(<([^>]+)>)/ig;
        const stepNumberRegex = /\b\d{1,2}\./g;
        const HTMLFollowedByStepNumberRegex = /(?:^|\>)\s*\d{1,2}\.\s*(?=\w|<)/gm;
        let formattedInstructions = InstructionsData.replace(stepNumberRegex, '');

        if (formattedInstructions.includes("<")) {
            // console.log(formattedInstructions)
            const parsedHTML = parser.parseFromString(formattedInstructions, 'text/html');
            const paragraphs = parsedHTML.querySelectorAll('p, li');
            instructionsArray = Array.from(paragraphs).map((p: any) => p.innerHTML);


        } else {
            // console.log(formattedInstructions)
            instructionsArray = formattedInstructions.split('.');
            for(let i = 0; i < instructionsArray.length; i++) {
                instructionsArray[i] = instructionsArray[i].trim();
                instructionsArray[i] += '.';
                
            }
            if(instructionsArray[instructionsArray.length - 1] === '.'){
                instructionsArray.pop();
            }
        }


        // if (htmLregex.test(formattedInstructions)) { // If the string contains any html tags
        //     formattedInstructions = formattedInstructions.split(/<\/?[a-z][\s\S]*>/i); // Split the string by the html tags
        // } else if (stepNumberRegex.test(formattedInstructions)) { // If the string contains instruction numbers in the format of a one or two digit number followed by a period
        //     formattedInstructions = formattedInstructions.split(/\d{1,2}\.\s/); // Split the string by the instruction numbers
        // } else { // Else, the string doesn't have html tags or instruction numbers in the specified format
        //     formattedInstructions = formattedInstructions.split(/\./); // Split the string by periods
        // }

        // formattedInstructions = InstructionsData.replace(htmLregex, '');
        // formattedInstructions = formattedInstructions.replace(stepNumberRegex, '');

        // console.log("instructionsArray", instructionsArray)
        // if (instructionsArray.length > 1) {
        //     setRecipeSteps(instructionsArray)
        // } else {
        //     // Process String with no steps

        //     const tmp = stepNumsRmed.replace(stepNumberRegex, '').trim();
        //     console.log("tmp", tmp)
        //     setRecipeSteps([stepNumsRmed])
        // }
        // console.log("instructionsArray", instructionsArray)

        // console.log("formattedInstructions", formattedInstructions)
        setRecipeSteps(instructionsArray)
    }, [InstructionsData])

    // console.log("InstructionsData", InstructionsData)
    // console.log("recipeSteps", recipeSteps)

    // console.log("InstructionsData", InstructionsData)
    return (
        <div>
            <div>
                {/* {InstructionsData.replace(/<\/?[^>]+(>|$)/g, "")} */}
                {/* {InstructionsData} */}
                {recipeSteps?.map((step: any, index: number) => {
                    return (
                        <div key={index}>
                            <div className='row my-3'>
                                <div className='col-12 row'>
                                    <h5 className='col-1'>-</h5>
                                    <div className='col-11 d-flex'>
                                        {step}
                                    </div>
                                </div>
                                <div className='col-1'></div>
                                <div className='col-11'></div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}