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
    padding-top: 2em;
    margin-bottom: 2em;

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
    max-width: 908px;
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

    > p {
        font-size: 1.125em;
    }

    .block-img {
        margin-top: 2em;
        margin-bottom: 2em;

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

const ButtonGroup = styled("div")`
    margin-top: 3em;

    button {
        padding: 0.95em 1.8em;
        font-size: 0.95rem;
    }

    a {
        margin-top: 1.5em;
        display: block;
        text-align: center;
    }
`

const ProjectMeta = styled("div")`
    margin-bottom: 3em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 3em;
    text-align: center;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-template-columns: 1fr 1fr;
        grid-gap 1.5em;
        text-align: left;
    }
`

const ProjectMetaTitle = styled("h2") `
    line-height: 1.2;
    font-size: 0.9em;
    margin-bottom: 0.5em;
    color: ${colors.grey900};
`

const ProjectMetaBlock = styled("div") `
    span,
    li {
        color: ${colors.grey700};
        font-size: 0.9em;
    }
`

const ProjectMetaList = styled("ul") `
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        list-style: none;
        
        &:not(:last-child) {
            margin-bottom: 0.125em;
        }
    }
`


const Project = ({ project, meta }) => {
    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: 'en',
                }}
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
                <ProjectMeta>
                    <ProjectMetaBlock>
                        <ProjectMetaTitle>
                            Year
                        </ProjectMetaTitle>
                        <span>{project.project_post_date.substring(0,4)}</span>
                    </ProjectMetaBlock>

                    <ProjectMetaBlock>
                        <ProjectMetaTitle>
                            Roles
                        </ProjectMetaTitle>
                        <ProjectMetaList>
                            {project.project_tags
                                .sort((a, b) => a.project_tag > b.project_tag ? 1 : -1)
                                .map((tag, i) => (
                                <li key={tag.project_tag}>{tag.project_tag}</li>
                            ))}
                        </ProjectMetaList>
                    </ProjectMetaBlock>

                    <ProjectMetaBlock>
                        <ProjectMetaTitle>
                            Topics
                        </ProjectMetaTitle>
                        <ProjectMetaList>
                            {project.project_topics
                                .sort((a, b) => a.project_topic > b.project_topic ? 1 : -1)
                                .map((topic, i) => (
                                <li key={topic.project_topic}>{topic.project_topic}</li>
                            ))}
                        </ProjectMetaList>
                    </ProjectMetaBlock>

                    <ProjectMetaBlock>
                        <ProjectMetaTitle>
                            For
                        </ProjectMetaTitle>
                        <span>{project.project_entity[0].text}</span>
                    </ProjectMetaBlock>
                </ProjectMeta>
                <ProjectBody>
                    {RichText.render(project.project_description)}
                    <ButtonGroup>
                        {project.project_url.url && (
                            <a href={project.project_url.url}>
                                <Button>
                                    View project
                                </Button>
                            </a>
                        )}
                        <WorkLink to={"/"}>
                            <Button className="Button--secondary">
                                See other work
                            </Button>
                        </WorkLink>
                    </ButtonGroup>
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
                                fluid(maxWidth: 908) {
                                ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        project_description
                        project_tags {
                            project_tag
                        }
                        project_topics {
                            project_topic
                        }
                        project_post_date
                        project_entity
                        project_url {
                            _linkType
                            ... on PRISMIC__ExternalLink {
                                url
                            }
                        }
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