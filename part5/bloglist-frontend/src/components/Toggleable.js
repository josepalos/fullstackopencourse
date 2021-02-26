import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.showButtonLabel || "Show" }</button>
        </div>
        <div style={showWhenVisible}>
            <div className="toggleableContent">
                {props.children}
            </div>
            <button onClick={toggleVisibility}>{props.hideButtonLabel || "Hide"}</button>
        </div>
    </div>;
});

Toggleable.propTypes = {
    showButtonLabel: PropTypes.string,
    hideButtonLabel: PropTypes.string,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;