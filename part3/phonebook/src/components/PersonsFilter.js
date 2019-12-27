import React from 'react';

const PersonsFilter = ({filter, setFilter}) => {
    const filterChangeHandler = (event) => {
        setFilter(event.target.value);     
    }

    return (
        <div>
            <h2>Filter</h2>
            <div>
                <form>
                    <span>Filter persons: </span>
                    <input 
                        value={filter}
                        onChange={filterChangeHandler}
                    />
                </form>
            </div>
        </div>
    )
}

export default PersonsFilter;