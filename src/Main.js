import { useEffect, useState } from "react";
import TableList from "./components/TableList";

const Main = () => {
    const DISEASES_QUERY = `
    query lungCarcinomaAssociatedTargets {
        disease(efoId: "EFO_0001071") {
          associatedTargets(page: { index: 0, size: 25 }) {
            rows {
              target {
                id
                approvedSymbol
                approvedName
              }
              score
              datatypeScores {
                id
                score
              }
            }
          }
        }
      }
    `
    const [diseases, setDiseases] = useState(null);


    useEffect(() => {
        fetch('https://api.platform.opentargets.org/api/v4/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: DISEASES_QUERY })
        })
            .then(res => {
                return res.json();
            })
            .then(d => {
                setDiseases(d.data.disease.associatedTargets.rows);
            })
    }, [])
    
    // Below commented code is to get data from the local JSON file 
    // by using following command 
    // npx json-server --watch data/db.json --port 8000

    //**NOTE : Before uncommenting below code we need to comment above useEffect() code */

    // useEffect(() => {
    //     fetch('http://localhost:8000/data')
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(d => {
    //             setDiseases(d.disease.associatedTargets.rows);
    //         })
    // }, [])

    return (
        <div className="main">
            {/* <h2>Genes Associated with lung carcinoma</h2> */}
            {diseases && <TableList diseases={diseases} title="Genes associated with lung carcinoma" />}
        </div>
    );
}

export default Main;