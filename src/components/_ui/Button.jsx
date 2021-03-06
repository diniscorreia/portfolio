import React, { Component } from 'react';
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

const ButtonContainer = styled("button")`
    padding: 1em 2em;
    background: ${colors.blue600};
    font-weight: 600;
    color: white;
    outline: none;
    border: none;
    font-size: 1rem;
    border-radius: 4px;
    position: relative;
    transition: background 100ms ease-in-out;

    @media(max-width:${dimensions.maxwidthMobile}px) {
        padding: 0.8em 1.8em;
        font-size: 1em;
    }

    p {
        margin: 0;
    }

    &:hover {
        cursor: pointer;
        background: ${colors.blue700};
    }

    &.Button--secondary {
        background: ${colors.blue200};
        color: ${colors.blue800};
        padding: 0.95em 1.8em;
        font-size: 0.95rem;

        &:hover {
            background: ${colors.blue300};
            transition: background 100ms ease-in-out;
        }
    }
`

class Button extends Component {
    render() {
        const { children, ...props } = this.props;
        return (
            <ButtonContainer
                onClick={this.props.onClick}
                {...props}>
                {this.props.children}
            </ButtonContainer>
        );
    }
}

export default Button;