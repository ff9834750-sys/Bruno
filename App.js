import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

  const [tab, setTab] = useState("dashboard");

  const [cuts, setCuts] = useState([]);

  const [client, setClient] = useState("");
  const [value, setValue] = useState("");
  const [payment, setPayment] = useState("Dinheiro");
  const [barber, setBarber] = useState("Luan");

  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const users = {
    "Bruno Vanzin": { password: "0000", role: "owner" },
    "Luan": { password: "000", role: "barber" }
  };

  function login() {
    if (users[loginName] && users[loginName].password === loginPass) {
      setUser({ name: loginName });
      setScreen("app");
    } else {
      alert("Login inválido");
    }
  }

  function addCut() {
    if (!client || !value) return;

    const newCut = {
      id: Date.now(),
      client,
      value: Number(value),
      payment,
      barber,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    };

    setCuts([newCut, ...cuts]);
    setClient("");
    setValue("");
  }

  function total() {
    return cuts.reduce((acc, c) => acc + c.value, 0);
  }

  function chartData() {
    const grouped = {};

    cuts.forEach(c => {
      grouped[c.date] = (grouped[c.date] || 0) + c.value;
    });

    return Object.keys(grouped).map(date => ({
      date,
      value: grouped[date]
    }));
  }

  /* LOGIN */
  if (screen === "login") {
    return (
      <div style={styles.login}>
        <div style={styles.card}>
          <h2 style={{ color: "#fff" }}>Barbearia Vanzin</h2>

          <input placeholder="Usuário" style={styles.input}
            onChange={(e) => setLoginName(e.target.value)} />

          <input placeholder="Senha" type="password" style={styles.input}
            onChange={(e) => setLoginPass(e.target.value)} />

          <button style={styles.btn} onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

  /* APP */
  return (
    <div style={styles.bg}>

      {/* HEADER */}
      <h2 style={{ color: "#fff" }}>Olá, {user.name}</h2>

      <div style={styles.menu}>
        <button onClick={() => setTab("dashboard")} style={styles.menuBtn}>
          Dashboard
        </button>

        <button onClick={() => setTab("agenda")} style={styles.menuBtn}>
          Agenda
        </button>

        <button onClick={() => setTab("grafico")} style={styles.menuBtn}>
          Gráficos
        </button>
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <>
          <div style={styles.box}>
            <input placeholder="Cliente" value={client}
              onChange={(e) => setClient(e.target.value)} style={styles.input} />

            <input placeholder="Valor" value={value}
              onChange={(e) => setValue(e.target.value)} style={styles.input} />

            <select value={payment}
              onChange={(e) => setPayment(e.target.value)} style={styles.input}>
              <option>Dinheiro</option>
              <option>Pix</option>
              <option>Cartão</option>
            </select>

            <select value={barber}
              onChange={(e) => setBarber(e.target.value)} style={styles.input}>
              <option>Luan</option>
              <option>Bruno Vanzin</option>
            </select>

            <button style={styles.btn} onClick={addCut}>
              + Adicionar corte
            </button>
          </div>

          <div style={styles.list}>
            {cuts.map(c => (
              <div key={c.id} style={styles.item}>
                <div>
                  <b>{c.client}</b>
                  <div style={{ fontSize: 12 }}>
                    {c.time} • {c.payment} • {c.barber}
                  </div>
                </div>
                <b>R$ {c.value}</b>
              </div>
            ))}
          </div>

          <h3 style={{ color: "#fff" }}>Total: R$ {total()}</h3>
        </>
      )}

      {/* AGENDA (CALENDÁRIO SIMPLES) */}
      {tab === "agenda" && (
        <div style={styles.cardBox}>
          <h3 style={{ color: "#fff" }}>Agenda do mês</h3>

          <div style={styles.calendar}>
            {[...Array(30)].map((_, i) => (
              <div key={i} style={styles.day}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GRÁFICO */}
      {tab === "grafico" && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00c853" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const styles = {
  login: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f0f"
  },

  card: {
    background: "#1c1c1c",
    padding: 20,
    borderRadius: 12,
    width: 300
  },

  bg: {
    minHeight: "100vh",
    background: "#0f0f0f",
    padding: 15
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "none"
  },

  btn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#00c853",
    border: "none",
    color: "#fff",
    borderRadius: 8
  },

  menu: {
    display: "flex",
    gap: 8,
    marginTop: 10
  },

  menuBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#1c1c1c",
    color: "#fff"
  },

  box: {
    background: "#1c1c1c",
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },

  list: {
    marginTop: 15
  },

  item: {
    background: "#1c1c1c",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    color: "#fff",
    display: "flex",
    justifyContent: "space-between"
  },

  cardBox: {
    background: "#1c1c1c",
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },

  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 5,
    marginTop: 10
  },

  day: {
    background: "#0f0f0f",
    color: "#fff",
    padding: 10,
    textAlign: "center",
    borderRadius: 6
  }
};