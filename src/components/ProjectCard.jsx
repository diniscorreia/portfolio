import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import colors from "styles/colors";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ProjectCardContainer = styled(Link)`
    display: grid;
    grid-template-columns: 4fr 7fr;
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
    margin-bottom: 4em;
    transition: all 150ms ease-in-out;
    text-decoration: none;
    color: currentColor;

    @media(max-width:950px) {
        grid-template-columns: 4.5fr 7fr;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
        grid-template-columns: 1fr;
    }

    @media(max-width:${dimensions.maxwidthMobile}px) {
        margin-bottom: 2em;
    }

    &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
        transition: all 150ms ease-in-out;

        .ProjectCardAction {
            color: ${colors.blue500};
            transition: all 150ms ease-in-out;

            .svg-inline--fa {
                transform: translateX(0px);
                opacity: 1;
                transition: transform 150ms ease-in-out;
            }
        }

        .ProjectCardContent::before {
            opacity: 0.02;
            transition: all 150ms ease-in-out;
        }

        .ProjectCardImageContainer::before {
            opacity: 0.2;
            transition: all 150ms ease-in-out;
        }
    }
`

const ProjectCardContent = styled("div")`
    background: white;
    padding: 4em 3em 2.25em 3em;
    position: relative;

    &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: ${colors.blue500};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    @media(max-width:950px) {
        padding: 3.25em 2.5em 2em 2.5em;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
        grid-row: 2;
    }
`

const ProjectCardYear = styled("div")`
    font-weight: 400;
    color: ${colors.grey600};
    font-size: 0.9em;
`

const ProjectCardCategory = styled("div")`
    font-weight: 600;
    color: ${colors.grey700};
    font-size: 0.9em;
`

const ProjectCardTitle = styled("h3")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
`

const ProjectCardBlurb = styled("div")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 5em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 2.5em;
    }
`

const ProjectCardAction = styled("div")`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;

    .svg-inline--fa {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }
`

const ProjectCardImageContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 2rem;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        padding-left: 1.5em;
        padding-right: 1.5em;
        padding-top: 1.5rem;
        max-height: 200px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: ${colors.blue500};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }
`

const ProjectCardImageContainerInner = styled("div")`
    width: 100%;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    overflow: hidden;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        max-width: 320px;
    }
`

const ProjectCard = ({ tags, title, description, thumbnail, date, uid}) => (
    <ProjectCardContainer to={`/work/${uid}`}>
        <ProjectCardContent className="ProjectCardContent">
            <ProjectCardYear>
                {date.substring(0,4)}
            </ProjectCardYear>
            <ProjectCardCategory>
                {tags
                    .sort((a, b) => a.project_tag > b.project_tag ? 1 : -1)
                    .map((tag, i) => (
                    <span key={tag.project_tag}>{i > 0 && ", "}{tag.project_tag}</span>
                ))}
            </ProjectCardCategory>
            <ProjectCardTitle>
                {title[0].text}
            </ProjectCardTitle>
            <ProjectCardBlurb>
                {RichText.render(description)}
            </ProjectCardBlurb>
            <ProjectCardAction className="ProjectCardAction">
                Details <FontAwesomeIcon icon={faArrowRight} />
            </ProjectCardAction>
        </ProjectCardContent>
        <ProjectCardImageContainer className="ProjectCardImageContainer">
            <ProjectCardImageContainerInner>
                <Img fluid={thumbnail.childImageSharp.fluid} />
            </ProjectCardImageContainerInner>
        </ProjectCardImageContainer>
    </ProjectCardContainer>
)

export default ProjectCard;

ProjectCard.propTypes = {
    tags: PropTypes.array.isRequired,
    thumbnail: PropTypes.object.isRequired,
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired
}