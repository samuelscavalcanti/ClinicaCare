import React from 'react';

import '../styles/global.css';
import '../styles/dashboard.css';

export function Dashboard() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2 className="sidebar-logo">ClinicaCare</h2>

        <ul className="sidebar-menu">
          <li>Pacientes</li>
          <li>Médicos</li>
          <li>Consultas</li>
          <li>Configurações</li>
        </ul>
      </aside>

      <main className="dashboard-main">

        <nav className="dashboard-navbar">
          <h3>Painel Administrativo</h3>

          <div className="navbar-user">
            <span>Administrador</span>
          </div>
        </nav>

        <section className="dashboard-content">

          <div className="cards-grid">

            <div className="dashboard-card">
              <h4>Pacientes</h4>
              <p>128</p>
            </div>

            <div className="dashboard-card">
              <h4>Médicos</h4>
              <p>12</p>
            </div>

            <div className="dashboard-card">
              <h4>Consultas Hoje</h4>
              <p>34</p>
            </div>

            <div className="dashboard-card">
              <h4>Agendamentos</h4>
              <p>18</p>
            </div>

          </div>

          <div className="table-section">

            <h3>Consultas Recentes</h3>

            <table>

              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Horário</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>João Silva</td>
                  <td>Dra. Ana</td>
                  <td>09:00</td>
                  <td>Confirmado</td>
                </tr>

                <tr>
                  <td>Maria Souza</td>
                  <td>Dr. Pedro</td>
                  <td>10:30</td>
                  <td>Pendente</td>
                </tr>

                <tr>
                  <td>Carlos Henrique</td>
                  <td>Dra. Julia</td>
                  <td>14:00</td>
                  <td>Concluído</td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}
