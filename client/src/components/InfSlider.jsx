import React from 'react'
import classes from './css/InfSlider.module.css'

const InfSlider = (props) => {
    return (
        <div className={classes.slider}>
            <div className={classes.slide_track}>
                {props.categories.map((category) => 
                    <div 
                        className={classes.slide} 
                        key={category.category_id}
                        onClick={() => props.goTo(`events?category=${category.category_id}`)}
                    >
                        <p>{category.name}</p>
                    </div>
                )}
                {props.categories.map((category) => 
                    <div 
                    className={classes.slide} 
                    key={category.category_id}
                    onClick={() => props.goTo(`events?category=${category.category_id}`)}
                    >
                        <p>{category.name}</p>
                    </div>
                )}
                {props.categories.map((category) => 
                    <div 
                    className={classes.slide} 
                    key={category.category_id}
                    onClick={() => props.goTo(`events?category=${category.category_id}`)}
                    >
                        <p>{category.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InfSlider