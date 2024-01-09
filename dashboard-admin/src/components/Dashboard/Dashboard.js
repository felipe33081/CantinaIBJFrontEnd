import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../services/Dashboard/dashboard";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          orderStatus: "Finished",
          FinalDate: "2024-01-09 12:09:03",
        };

        const data = await getDashboardData(params);
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="chart-container chart">
        <h2 className="color-name-charts">Vendas</h2>
        {dashboardData && (
          <Bar
            data={{
              labels: ["Quantidade de Pedidos"],
              datasets: [
                {
                  label: "Quantidade de Pedidos em Andamento",
                  backgroundColor: "#59bfff",
                  borderColor: "#000000",
                  borderWidth: 2,
                  data: [dashboardData?.ordersInProgress || 0],
                },
                {
                  label: "Quantidade de Pedidos Finalizados",
                  backgroundColor: "rgb(145 254 159 / 47%)",
                  borderColor: "#000000",
                  borderWidth: 2,
                  data: [dashboardData?.ordersFinished || 0],
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: "category",
                },
              },
            }}
          />
        )}
      </div>
      <div className="chart-container chart">
        <h2 className="color-name-charts">Receita</h2>
        {dashboardData && (
          <Bar
            data={{
              labels: ["Valores Totais"],
              datasets: [
                {
                  label: "Valor Total de Pedidos em Andamento",
                  backgroundColor: "#59bfff",
                  borderColor: "#000000",
                  borderWidth: 2,
                  data: [dashboardData?.totalValueInProgressAmount || 0],
                },
                {
                  label: "Valor Total de Pedidos Finalizados",
                  backgroundColor: "rgb(145 254 159 / 47%)",
                  borderColor: "#000000",
                  borderWidth: 2,
                  data: [dashboardData?.totalValueFinishedAmount || 0],
                },
                {
                  label: "Valor Total",
                  backgroundColor: "#272e61",
                  borderColor: "#000000",
                  borderWidth: 2,
                  data: [dashboardData?.totalValueAmount || 0],
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: "category",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
