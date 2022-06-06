import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const useStyles = makeStyles(() => ({
  headerSection: {
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    paddingTop: '153px',
    paddingBottom: '110px',
    '@media screen and (max-width: 600px)': {
      paddingTop: '120px',
      paddingBottom: '50px',
    }
  },
  headerContents: {
    width: '87.5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1400px',  
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media screen and (max-width: 899.98px)': {
      order: '1',
      width: '100%',
      display: 'block',
    }
  },
  wellcomeTitle: {
    fontSize: '86px',
    color: '#282C3C',
    lineHeight: '160px',
    '@media screen and (max-width: 1200px)': {
      fontSize: '60px',
      lineHeight: '100px',
    },
    '@media screen and (max-width: 899.98px)': {
      fontSize: '46px',
      lineHeight: '86px',
      textAlign: 'center',
    }
  },
  redTitle: {
    fontSize: '86px',
    color: '#282C3C',
    lineHeight: '160px',
    '@media screen and (max-width: 1200px)': {
      fontSize: '60px',
      lineHeight: '100px',
    },
    '@media screen and (max-width: 899.98px)': {
      fontSize: '46px',
      lineHeight: '86px',
      textAlign: 'center',
    }
  },
  evoleBtn: {    
    color: 'white',
    width: '200px',
    height: '64px',
    fontSize: '22px',
    marginTop: '50px',
    textTransform: 'none',
    '@media screen and (max-width: 899.98px)': {
      marginLeft: 'auto',
      display: 'flex',
      marginRight: 'auto',
    },
    '@media screen and (max-width: 600px)': {
      width: '100%',
      fontSize: '1rem',
      height: '50px',
      marginTop: '50px',
    }
  },
  headerRightImg: {
    width: '100%',
    maxWidth: '628px',
    margin: 'auto',
    display: 'flex',
  }
}))

const HeaderSection: FC = () => {

  const router = useRouter()

  const classes = useStyles()

  return (
    <Box className="headerSection">
      <Box className="headerContents">
        <Grid container>
          <Grid item sm={12} md={6} lg={6} className="headerLeft">
            <Typography variant='h1' className="wellcomeTitle">
              wELCOME TO
            </Typography>
            <Typography variant='h1' className="redTitle">
              IGUANAS
            </Typography>
            <Button className={"bg-blue evoleBtn"} onClick={() => router.push('/evolve')}>
              Evolve
            </Button>
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <img src="/Racoons.png" alt="Racoons" className="headerRightImg" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default HeaderSection
