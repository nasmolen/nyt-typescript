import React from 'react';
import {SyntheticEvent} from 'react';

type NytProps = {
    results: [
      // _id: number,
      // headline: {},
      // multimedia: [],
      // snippet: string,
      // keywords: [],
      // web_url: string
    ]
    changePageNumber: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => void;
}

// interface ResultData {
//     _id: number,
//     headline: {},
//     multimedia: [],
//     snippet: string,
//     keywords: [],
//     web_url: string
// }

const NytResults: React.FunctionComponent<NytProps> = (props) => {
  return (
    <div>
      <div>
        { props.results.map((result: any) => {
          return (
            <div key={result._id}>
            <h2>{result.headline.main}</h2>
            {result.multimedia.length > 1 ? <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
            <p>
              {result.snippet}
              <br />
              {result.keywords.length > 0 ? ' Keywords: ' : ''}
            </p>
            <ul>
              {result.keywords.map((keyword: any) => <li key={keyword.value}>{keyword.value}</li>)}
            </ul>
            <a href={result.web_url}><button>Read It</button></a>
          </div>
          )
        })}
          <div>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.changePageNumber(e, 'down')}>Previous 10</button>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.changePageNumber(e, 'up')}>Next 10</button>
          </div>
      </div>
    </div>
  )
}

export default NytResults;