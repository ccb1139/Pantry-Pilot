import React, { useState, useEffect, useRef } from 'react'

type Props = {
    InstructionsData: any,
}

export default function RecipeSteps({ InstructionsData }: Props) {
    const [recipeSteps, setRecipeSteps] = useState<any>([])

    useEffect(() => {
        if(!InstructionsData) return;
        const parser = new DOMParser();
        let instructionsArray : string[] = [];
        const htmLregex = /(<([^>]+)>)/ig;
        const stepNumberRegex = /\b\d{1,2}\./g;
        const HTMLFollowedByStepNumberRegex = /(?:^|\>)\s*\d{1,2}\.\s*(?=\w|<)/gm;
        let formattedInstructions = InstructionsData?.replace(stepNumberRegex, '');

        if (formattedInstructions?.includes("<")) {
            // console.log(formattedInstructions)
            const parsedHTML = parser.parseFromString(formattedInstructions, 'text/html');
            const paragraphs = parsedHTML.querySelectorAll('p, li');
            instructionsArray = Array.from(paragraphs).map((p: any) => p.innerHTML);


        } else {
            // console.log(formattedInstructions)
            instructionsArray = formattedInstructions?.split('.');
            for(let i = 0; i < instructionsArray.length; i++) {
                instructionsArray[i] = instructionsArray[i].trim();
                instructionsArray[i] += '.';
                
            }
            if(instructionsArray[instructionsArray.length - 1] === '.'){
                instructionsArray.pop();
            }
        }

        setRecipeSteps(instructionsArray)
    }, [InstructionsData])

    // console.log("InstructionsData", InstructionsData)
    // console.log("recipeSteps", recipeSteps)

    // console.log("InstructionsData", InstructionsData)
    return (
        <div>
            <div>

                {
                recipeSteps?.length > 0 ?
                (recipeSteps?.map((step: any, index: number) => {
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
                })) :
                ( <div className='row my-3 d-flex justify-content-center'>
                    View source for instructions
                    </div>
                    )
                
                }

            </div>

        </div>
    )
}