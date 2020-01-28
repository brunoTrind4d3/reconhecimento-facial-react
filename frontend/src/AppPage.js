import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Camera from 'react-html5-camera-photo';
import './AppPage.css';
import 'react-html5-camera-photo/build/css/index.css';
import api from './services/api';
import history from './services/history';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 10,
  },

  tableContainer: {
    margin: 'auto',
    maxWidth: 650,
    marginTop: 10,
    flex: 1,
  },

  asideBox: {
    minWidth: 500,
    background: 'transparent',
    borderRadius: 2,
    paddingRight: 30,
    paddingLeft: 30,
    margin: 'auto',
    height: 550,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 10,
  },

  mainBox: {
    paddingTop: 40,
    minWidth: 690,
    borderRadius: 2,
    margin: 'top',
    alignItems: 'center',
  },

  main: {
    flex: 1,
  },

  div: {
    display: 'grid',
    gap: 30,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  title: {
    display: 'flex',
    color: '#fff',
    paddingTop: 30,
    justifyContent: 'center',
    marginBottom: 30,
  },

  tablePagination: {
    backgroundColor: '#fff',
    margin: 'auto',
    maxWidth: 650,
    borderRadius: 5,
    paddingRight: 10,
  },

  titleNovo: {
    flexGrow: 1,
  },

  root: {
    flexGrow: 1,
  },
});

export default function AppPage({ location }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [travel, setData] = React.useState({});
  const [passangers, setPassangers] = React.useState([]);

  useEffect(() => {
    async function loadData({ travel }) {
      console.log(travel);
      if (travel) {
        setData(travel);
        setPassangers(travel.passangers);
      } else {
        history.push('/');
      }
    }
    loadData(location);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function handleTakePhoto(dataUri) {
    const response = await api.post('/search', {
      params: {
        travel_number: travel.travel_number,
        date: travel.date,
        dataUri: dataUri,
      },
    });

    if (response.data) {
      console.log('OK');
    }
    console.log(response);
  }

  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <h1>Sua logo aqui</h1>
        <br />
      </div>
      <div className="divTravel">
        <h5>Viagem: {travel.travel_number}</h5>
        <h5>Destino: {travel.travel_location}</h5>

        <h5>Data: {travel.date}</h5>
      </div>
      <div className={classes.div}>
        <aside className={classes.asideBox}>
          <Camera
            idealResolution={{ width: 200, height: 200 }}
            style={{ color: '#fff' }}
            onTakePhoto={dataUri => {
              handleTakePhoto(dataUri);
            }}
          />
        </aside>
        <main className={classes.mainBox}>
          <Paper>
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="center">Nº passagem</TableCell>
                    <TableCell align="center">Embarcado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {passangers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <TableRow key={row._id}>
                        <TableCell align="center">
                          {
                            <img
                              className="img"
                              src={row.photoUrl}
                              alt={row.name}
                            />
                          }
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.passportCard}</TableCell>
                        <TableCell align="center">
                          {row.checked ? (
                            <Check size={20} style={{ color: 'green' }} />
                          ) : (
                            <Close size={20} style={{ color: 'red' }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={4}
              component="div"
              count={passangers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </main>
      </div>
    </>
  );
}
