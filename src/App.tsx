import './App.css'
import {useState} from "react";

const fileStructure = {
  children: [
    {
      name: 'src',
      children: [
        {
          name: 'App.css',
          children: [
            {
              name: 'App.css',
            },
            {
              name: 'App.tsx',
              children: [
                {
                  name: 'App.css',
                  children: [
                    {
                      name: 'App.css',
                    },
                    {
                      name: 'App.tsx',
                    },
                  ],
                },
                {
                  name: 'App.tsx',
                },
              ],
            },
          ],
        },
        {
          name: 'App.tsx',
        },
      ],
    },
    {
      name: 'index.html',
    },
    {
      name: 'package.json',
    },
  ]
}

interface IEntryProps {
  name: string
  children?: IEntryProps[]
}

const Entry = ({entry, depth}: {entry: IEntryProps, depth: number}) => {
  const [open, setOpen] = useState<boolean>(false)

  const hasChildren = !!entry.children?.length

  const handleClick = () => {
    if(hasChildren) setOpen(!open)
  }

  return <div>
    {entry.children
      ? <div onClick={handleClick}>{open ? '-' : '+'} {entry?.name}</div>
      : <div>{entry.name}</div>
    }
    {hasChildren && open && <div style={{marginLeft: depth * 5 + 'px'}}>
      {entry?.children?.map((item, i) => (
        <Entry entry={item} depth={depth + 1} key={i} />
      ))}
    </div>}
  </div>
}

function App() {

  return (
    <div className="App">
      {fileStructure.children.map((item, i) => (
        <Entry entry={item} depth={1} key={i}/>
      ))}
    </div>
  )
}

export default App
