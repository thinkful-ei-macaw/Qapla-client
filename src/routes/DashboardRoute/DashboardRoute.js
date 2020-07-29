import React, { Component } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import { LangProvider } from "../../contexts/LangContext";

class DashboardRoute extends Component {


  render() {
    return (
      <section>
        <h2>Klingon</h2>
        <h3 className='sub-title'>the Warrior's Tongue</h3>
        <LangProvider>
          <Dashboard />
        </LangProvider>
      </section>
    );
  }
}

export default DashboardRoute
