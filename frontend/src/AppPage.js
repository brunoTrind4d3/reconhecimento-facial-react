import React from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  tableContainer: {
    margin: 'auto',
    maxWidth: 650,
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
  },

  mainBox: {
    paddingTop: 30,
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
  },
});

export default function AppPage(data) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();
  const passengers = data.location.passangers;
  console.log(passengers);
  return (
    <>
      <div className={classes.title}>
        <h1>Sua logo aqui</h1>
      </div>
      <div className={classes.div}>
        <aside className={classes.asideBox}>
          <Camera />
        </aside>
        <main className={classes.mainBox}>
          <TableContainer className={classes.tableContainer} component={Paper}>
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
                {passengers.map(row => (
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
            rowsPerPageOptions={[4]}
            component="div"
            count={passengers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </main>
      </div>
    </>
  );
}
