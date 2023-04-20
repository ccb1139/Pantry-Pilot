import React from 'react'

// Icon Imports
import { IconContext } from "react-icons";
import { GiPlainCircle } from 'react-icons/gi'

import ProgressBar from 'react-bootstrap/ProgressBar';

type Props = { stats: any }

function CategoryStatsGraph({ stats }: Props) {
    return (
        <div className='d-flex row'>
            <div className='d-flex flex-column col-auto'>
                <div>
                    <IconContext.Provider value={{ color: "green", className: "exp-color-ind me-1" }}>
                        <GiPlainCircle size={10} />
                        <span style={{ fontSize: "12px" }} >&gt; 4 Days left</span>
                    </IconContext.Provider>
                </div>
                <div>
                    <IconContext.Provider value={{ color: "#fcba03", className: "exp-color-ind me-1" }}>
                        <GiPlainCircle size={10} />
                        <span style={{ fontSize: "12px" }}>1-4 Days left</span>
                    </IconContext.Provider>
                </div>
                <div>
                    <IconContext.Provider value={{ color: "red", className: "exp-color-ind me-1" }}>
                        <GiPlainCircle size={10} />
                        <span style={{ fontSize: "12px" }}>Expired</span>
                    </IconContext.Provider>
                </div>
            </div>
            <div className='col-12'>
                <ProgressBar className=''>
                    <ProgressBar
                        variant="success"
                        label={((stats?.totalItems) - (stats?.totalCloseToExpiring + stats?.totalExpired))}
                        now={(((stats?.totalItems) - (stats?.totalCloseToExpiring + stats?.totalExpired)) / (stats?.totalItems) * 100)}
                        key={1}
                    />
                    <ProgressBar
                        variant="warning"
                        label={stats?.totalCloseToExpiring}
                        now={((stats?.totalCloseToExpiring / stats?.totalItems) * 100)}
                        key={2}
                    />
                    <ProgressBar
                        variant="danger"
                        label={stats?.totalExpired}
                        now={((stats?.totalExpired / stats?.totalItems) * 100)}
                        key={3}
                    />
                </ProgressBar>
            </div>

        </div>
    )
}

export default CategoryStatsGraph