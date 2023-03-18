import React from 'react'
import classes from './css/InfSlider.module.css'

const InfSlider = (props) => {
    return (
        <div className={classes.slider}>
            <div className={classes.slide_track}>
                {props.categories.map((category) => 
                    <div className={classes.slide} key={category.id}>
                        <p>{category.name}</p>
                    </div>
                )}
                {props.categories.map((category) => 
                    <div className={classes.slide} key={category.id}>
                        <p>{category.name}</p>
                    </div>
                )}
                {props.categories.map((category) => 
                    <div className={classes.slide} key={category.id}>
                        <p>{category.name}</p>
                    </div>
                )}

                {/* <div className={classes.slide}>
                    <p>text 1</p>
                </div>
                <div className={classes.slide}>
                    <p>text 2</p>
                </div>
                <div className={classes.slide}>
                    <p>text 3</p>
                </div>
                <div className={classes.slide}>
                    <p>text 4</p>
                </div>
                <div className={classes.slide}>
                    <p>text 5</p>
                </div> */}
            </div>
        </div>
    )
}

export default InfSlider