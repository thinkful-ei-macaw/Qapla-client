import React, { Component } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import { LangProvider } from "../../contexts/LangContext";

class DashboardRoute extends Component {


  render() {
    return (
      <section>
        <LangProvider>
          <Dashboard />
        </LangProvider>
      </section>
    );
  }
}

export default DashboardRoute
