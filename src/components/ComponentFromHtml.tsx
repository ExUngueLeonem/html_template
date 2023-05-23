import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Test from "./Test";
interface IProps {
  filePath: string;
  data?: {
    [key: string]: string;
  }
  children?: ReactNode;
}

const ComponentFromHtml: FC<IProps> = ({filePath, data, children}) => {
  const [html, setHtml] = useState('')
  const ref = useRef<HTMLDivElement | null>(null)

  const getHtmlText = async (filePath: string) => {
    const res = await fetch(filePath);
    return await res.text();
  }
  const injectHtmlData = () => {
    if (!data) return
    if (!ref.current) return;
    for (let key in data) {
      const elements = ref.current?.querySelectorAll(`[data-${key}]`)
      for (let elem of elements) elem.innerHTML = data[key]
    }
  }

  const injectReactChildren = () => {
    if (!children) return
    const parent = ref.current?.querySelector("#children");
    console.log(parent)
    if (!parent) return;
    const child = React.createElement(Test)
    // @ts-ignore
    parent.append(child)

    // parent.innerHTML = "asd"
    // console.log("parent", parent)
    // parent.append(<Test/>)
    // parent.
    //
    // ReactDOM.render().render(ref.current, children)
    // if (parent) parent.append(children)
  }

  useEffect(() => {
    getHtmlText(filePath)
      .then(res => setHtml(res))
      .then(() => injectHtmlData())
      .then(() => injectReactChildren())
  })

  return (
    <div ref={ref} dangerouslySetInnerHTML={{__html: html}} style={{display: "contents"}}></div>
  );
};

export default ComponentFromHtml;