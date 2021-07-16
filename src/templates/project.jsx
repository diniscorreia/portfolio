import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql } from 'gatsby';
import Img from "gatsby-image";
import { RichText } from "prismic-reactjs";
import Button from "components/_ui/Button";
import Layout from "components/Layout";
import dimensions from "styles/dimensions";

const ProjectHeroContainer = styled("div")`
    background: ${colors.grey200};
    overflow: hidden;
    position: relative;
    padding-top: 2.5em;
    margin-bottom: 2.5em;

    img {
        max-width: 600px;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-left: -2.5em;
        margin-right: -2.5em;
        padding-left: 2.5em;
        padding-right: 2.5em;
    }

    @media(max-width:${dimensions.maxwidthMobile}px) {
        margin-left: -2em;
        margin-right: -2em;
        padding-left: 2em;
        padding-right: 2em;
    }
`

const ProjectHeroContainerImage = styled("div")`
    max-width: 600px;
    margin: 0 auto;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.32);
`

const ProjectTitle = styled("div") `
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const ProjectBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Project = ({ project, meta }) => {
    return (
        <>
            <Helmet
                title={`${project.project_title[0].text} | Dinis Correia`}
                titleTemplate={`%s`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title[0].text} | Dinis Correia`,
                    },
                    {
                        property: `og:description`,
                        content: meta.description,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        property: `og:image`,
                        content: meta.url + meta.image,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: meta.twitterUsername,
                    },
                    {
                        name: `twitter:title`,
                        content: meta.title,
                    },
                    {
                        property: `twitter:image`,
                        content: meta.url + meta.image,
                    },
                    {
                        name: `twitter:description`,
                        content: meta.description,
                    },
                ].concat(meta)}
            />
            <Layout>
                <ProjectTitle>
                    {RichText.render(project.project_title)}
                </ProjectTitle>
                {project.project_preview_thumbnail_image && (
                    <ProjectHeroContainer>
                        <ProjectHeroContainerImage>
                            <Img fluid={project.project_preview_thumbnail_imageSharp.childImageSharp.fluid} />
                        </ProjectHeroContainerImage>
                    </ProjectHeroContainer>
                )}
                <ProjectBody>
                    {RichText.render(project.project_description)}
                    <WorkLink to={"/"}>
                        <Button className="Button--secondary">
                            See other work
                        </Button>
                    </WorkLink>
                </ProjectBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const projectContent = data.prismic.allProjects.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Project project={projectContent} meta={meta}/>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
};

export const query = graphql`
    query ProjectQuery($uid: String) {
        prismic {
            allProjects(uid: $uid) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_category
                        project_post_date
                        project_preview_thumbnail_image
                        project_preview_thumbnail_imageSharp {
                            childImageSharp {
                                fluid(maxWidth: 600) {
                                ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        project_description
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
                twitterUsername
                url
                image
            }
        }
    }
`