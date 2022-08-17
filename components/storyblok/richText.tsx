import React from "react";

export interface RichTextType {
    type: "doc"
    content: (HeadingType | ParagraphType | BulletListType)[]
}

interface MarkLink {
    attrs: {
        anchor: null,
        href: string,
        linktype: null,
        target: "_blank"
    }
    type: "link"
}

interface MarkStyleType {
    type: "bold" | "italic"
}

type MarkType = MarkLink | MarkStyleType

interface TextType {
    // attrs?: { level: number }
    text: string,
    type: "text"
    marks?: MarkType[]
}

interface ParagraphType {
    content?: TextType[]
    type: "paragraph"
}

interface HeadingType {
    attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 }
    content: TextType[]
    type: "heading"
}

interface ListItemType {
    content: ParagraphType[]
    type: "list_item"
}

interface BulletListType {
    type: "bullet_list"
    content: ListItemType[]
}

interface Props {
    data: RichTextType
}

export const RichText: React.FC<Props> = props => {
    if (!props.data.content) return <>Empty Blogpost</>
    return (

        <section className={"font-blog font-medium text-base leading-6"}>{
            props.data.content.map((s, index) => {
                if (s.type === "paragraph") {
                    return <Paragraph key={index} data={s}/>
                } else if (s.type === "heading") {
                    return <Heading key={index} data={s}/>
                } else if (s.type === "bullet_list") {
                    return <BulletList key={index} data={s}/>
                } else {
                    console.log("Not implemented Richtext", s)
                }
            })
        }
        </section>
    )
}

const Heading = (props: { data: HeadingType }) => {
    return (
        <>
            {props.data.content.map((h, index) => {
                switch (props.data.attrs.level) {
                    case 1:
                        return <h1 key={index}>{h.text}</h1>
                    case 2:
                        return <h2 key={index}>{h.text}</h2>
                    case 3:
                        return <h3 className={"font-heading font-medium leading-tight text-2xl my-5"} key={index}>{h.text}</h3>
                    case 4:
                        return <h4 className={"font-heading font-medium leading-tight text-1xl my-2"} key={index}>{h.text}</h4>
                    case 5:
                        return <h5 key={index}>{h.text}</h5>
                    case 6:
                        return <h6 key={index}>{h.text}</h6>
                    default:
                        console.error("Error happened with some heading")
                        return <div key={index}>{h.text}</div>
                }
            })}
        </>
    )
}

const ListItem = (props: { data: ListItemType }) => {
    return (
        <>
            <li>
                {props.data.content.map((t, index) => {
                    return <Paragraph key={index} data={t}/>
                })}

            </li>


        </>
    )
}

const BulletList = (props: { data: BulletListType }) => {
    return (
        <>
            <ul>
                {props.data.content.map((h, index) => {
                    return (
                        <ListItem key={index} data={h}/>
                    )
                })}
            </ul>
        </>
    )
}

// const Text = (props: { data: TextType }) => {
//     return (
//         <>
//             {
//                 props.data.text
//             }
//         </>
//     )
// }

const Paragraph = ({data}: { data: ParagraphType }) => {

    if (data.content === undefined) return <br/>
    return (
        <p className={"my-2"}>
            {data.content.map((p, index) => {
                    if (p.marks) {
                        let classnames = p.marks.find(m => m.type === "italic") === undefined ? ""
                            : "italic"
                        classnames += p.marks.find(m => m.type === "bold") === undefined ? ""
                            : "font-bold"
                        const link = p.marks.find(m => m.type === "link")
                        if (link && link.type === "link") {
                            return <a className={classnames} key={index} href={link.attrs.href}
                                      target={link.attrs.target}>{p.text}</a>
                        }
                        return (<span className={classnames} key={index}>{p.text}</span>)
                    }
                    return (<span key={index}>{p.text}</span>)
                }
            )}
        </p>
    )
}
