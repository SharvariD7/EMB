import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import '../css/style.css';

const TableList = ({ diseases, title }) => {

    diseases.map(ele => {
        ele.score = parseFloat(ele.score).toFixed(3);
    })

    const redirect_URL_appSym = 'https://platform.opentargets.org/target/';
    const columns = [{
        dataField: 'target.approvedSymbol',
        text: 'Approved Symbol',
        formatter: (cell, row) => <a href={redirect_URL_appSym + row.target.approvedName}> {cell} </a>
    }, {
        dataField: 'target.approvedName',
        text: 'Gene Name'
    }, {
        dataField: 'score',
        text: 'Product ID'
    }];

    const expandRow = {
        renderer: row => (
            <div>
                <Tabs defaultActiveKey="first" className='tabsclass'>
                    <Tab eventKey="first" title="Bar Chart">
                        <div className='chartBox'>
                            <BarChart chartData={row.datatypeScores} chartTitle={row.target.approvedSymbol} />
                        </div>
                    </Tab>
                    <Tab eventKey="second" title="Radar Chart">
                        <div className='chartBox'>
                            <RadarChart chartData={row.datatypeScores} chartTitle={row.target.approvedSymbol} />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        ),
        showExpandColumn: true,
        expandByColumnOnly: true,
        onlyOneExpanding: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b></b>;
            }
            return <b></b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>-</b>
                );
            }
            return (
                <b>+</b>
            );
        }
    };


    return (
        <div >
            <h2 style={{ textAlignLast:'left', marginLeft:70}}> {title}</h2>
            <BootstrapTable bootstrap4
                keyField='target.approvedSymbol'
                data={diseases}
                columns={columns}
                expandRow={expandRow}
                pagination={paginationFactory()}
            />
        </div>
    );
}

export default TableList;