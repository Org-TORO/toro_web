import { type ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./demo.page.css";

type DemoScreen =
  | "login"
  | "loginSuccess"
  | "dashboard"
  | "ledgers"
  | "source"
  | "catch"
  | "lot"
  | "confirm"
  | "success";

type DemoData = {
  email: string;
  password: string;
  supplier: string;
  sourceType: string;
  vessel: string;
  catchDate: string;
  catchArea: string;
  catchMethod: string;
  fishType: string;
  grade: string;
  quantity: string;
  lotCode: string;
  temperature: string;
  note: string;
  signatureName: string;
};

const initialData: DemoData = {
  email: "manager@toro.demo",
  password: "password",
  supplier: "Bien Dong Seafood Co.",
  sourceType: "Fishing vessel",
  vessel: "VN-12345 - Ocean Star",
  catchDate: "2026-09-25",
  catchArea: "North Gulf",
  catchMethod: "Handline",
  fishType: "Yellowfin Tuna",
  grade: "Grade A",
  quantity: "2500",
  lotCode: "LOT-TORO-0926",
  temperature: "-18",
  note: "Ready for review",
  signatureName: "Nguyen Van A",
};

const screenOptions: { screen: DemoScreen; label: string }[] = [
  { screen: "login", label: "Login" },
  { screen: "dashboard", label: "Dashboard" },
  { screen: "ledgers", label: "Ledgers" },
  { screen: "source", label: "Source" },
  { screen: "catch", label: "Catch" },
  { screen: "lot", label: "Lot" },
  { screen: "confirm", label: "Confirm" },
  { screen: "success", label: "Success" },
];

export default function DemoPage() {
  const [screen, setScreen] = useState<DemoScreen>("login");
  const [data, setData] = useState<DemoData>(initialData);

  const updateData = (field: keyof DemoData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const resetDemo = () => {
    setData(initialData);
    setScreen("login");
  };

  return (
    <main className="demo-page">
      <div className="demo-shell">
        <aside className="demo-panel demo-panel-left">
          <Link className="demo-home-link" to="/">
            Back home
          </Link>
          <h1>TORO mobile demo</h1>
          <div className="demo-screen-list" aria-label="Demo screens">
            {screenOptions.map((item) => (
              <button
                className={item.screen === screen ? "demo-screen-tab active" : "demo-screen-tab"}
                key={item.screen}
                onClick={() => setScreen(item.screen)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <PhoneSimulator>
          <DemoScreenRenderer data={data} screen={screen} setScreen={setScreen} updateData={updateData} />
        </PhoneSimulator>

        <aside className="demo-panel demo-panel-right">
          <div className="demo-data-header">
            <h2>Memory data</h2>
            <button className="demo-reset-button" onClick={resetDemo} type="button">
              Reset
            </button>
          </div>
          <dl className="demo-memory-list">
            <MemoryRow label="Account" value={data.email} />
            <MemoryRow label="Supplier" value={data.supplier} />
            <MemoryRow label="Vessel" value={data.vessel} />
            <MemoryRow label="Catch" value={`${data.fishType}, ${data.quantity} kg`} />
            <MemoryRow label="Lot" value={data.lotCode} />
            <MemoryRow label="Signer" value={data.signatureName} />
          </dl>
        </aside>
      </div>
    </main>
  );
}

function PhoneSimulator({ children }: { children: ReactNode }) {
  return (
    <section className="phone-frame" aria-label="Mobile simulator">
      <div className="phone-speaker" />
      <div className="phone-screen">{children}</div>
      <div className="phone-home-indicator" />
    </section>
  );
}

function DemoScreenRenderer({
  data,
  screen,
  setScreen,
  updateData,
}: {
  data: DemoData;
  screen: DemoScreen;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  if (screen === "login") {
    return <LoginScreen data={data} setScreen={setScreen} updateData={updateData} />;
  }

  if (screen === "loginSuccess") {
    return <LoginSuccessScreen setScreen={setScreen} />;
  }

  if (screen === "dashboard") {
    return <DashboardScreen setScreen={setScreen} />;
  }

  if (screen === "ledgers") {
    return <LedgerListScreen setScreen={setScreen} />;
  }

  if (screen === "source") {
    return <SourceScreen data={data} setScreen={setScreen} updateData={updateData} />;
  }

  if (screen === "catch") {
    return <CatchScreen data={data} setScreen={setScreen} updateData={updateData} />;
  }

  if (screen === "lot") {
    return <LotScreen data={data} setScreen={setScreen} updateData={updateData} />;
  }

  if (screen === "confirm") {
    return <ConfirmScreen data={data} setScreen={setScreen} updateData={updateData} />;
  }

  return <SuccessScreen data={data} setScreen={setScreen} />;
}

function LoginScreen({
  data,
  setScreen,
  updateData,
}: {
  data: DemoData;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <BrandMark />
        <h2>WELCOME TO TORO</h2>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            setScreen("loginSuccess");
          }}
        >
          <label>
            Username or email
            <input
              autoComplete="username"
              onChange={(event) => updateData("email", event.target.value)}
              value={data.email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              onChange={(event) => updateData("password", event.target.value)}
              type="password"
              value={data.password}
            />
          </label>
          <button className="primary-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginSuccessScreen({ setScreen }: { setScreen: (screen: DemoScreen) => void }) {
  return (
    <div className="login-screen">
      <div className="login-card success-card">
        <BrandMark />
        <h2>WELCOME TO TORO</h2>
        <div className="success-badge">OK</div>
        <button className="primary-button" onClick={() => setScreen("dashboard")} type="button">
          Continue
        </button>
      </div>
    </div>
  );
}

function DashboardScreen({ setScreen }: { setScreen: (screen: DemoScreen) => void }) {
  const stats = [
    ["12", "Open ledgers"],
    ["08", "Pending lots"],
    ["04", "On chain"],
  ];

  return (
    <MobileScaffold active="Dashboard" setScreen={setScreen} title="Dashboard">
      <section className="dashboard-hero">
        <p>Traceability overview</p>
        <h2>Source ledger control</h2>
      </section>
      <div className="stat-grid">
        {stats.map(([value, label]) => (
          <article className="stat-card" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <button className="wide-action" onClick={() => setScreen("ledgers")} type="button">
        Open source ledgers
      </button>
    </MobileScaffold>
  );
}

function LedgerListScreen({ setScreen }: { setScreen: (screen: DemoScreen) => void }) {
  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="Source ledgers">
      {["SL-2026-0001", "SL-2026-0002", "SL-2026-0003"].map((id, index) => (
        <button className="ledger-row" key={id} onClick={() => setScreen("source")} type="button">
          <span className="ledger-icon">DOC</span>
          <span>
            <strong>Source ledger</strong>
            <small>{id}</small>
            <small>{index === 0 ? "Created today" : "Ready for detail review"}</small>
          </span>
        </button>
      ))}
    </MobileScaffold>
  );
}

function SourceScreen({
  data,
  setScreen,
  updateData,
}: {
  data: DemoData;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="A. Fish source">
      <div className="form-stack">
        <TextField data={data} field="supplier" label="Supplier" updateData={updateData} />
        <TextField data={data} field="sourceType" label="Source type" updateData={updateData} />
        <TextField data={data} field="vessel" label="Fishing vessel" updateData={updateData} />
      </div>
      <ScreenActions back={() => setScreen("ledgers")} next={() => setScreen("catch")} />
    </MobileScaffold>
  );
}

function CatchScreen({
  data,
  setScreen,
  updateData,
}: {
  data: DemoData;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="B. Catch info">
      <div className="form-stack">
        <TextField data={data} field="catchDate" label="Catch date" type="date" updateData={updateData} />
        <TextField data={data} field="catchArea" label="Catch area" updateData={updateData} />
        <TextField data={data} field="catchMethod" label="Catch method" updateData={updateData} />
        <TextField data={data} field="fishType" label="Fish type" updateData={updateData} />
        <TextField data={data} field="grade" label="Quality grade" updateData={updateData} />
        <TextField data={data} field="quantity" label="Raw material quantity (kg)" updateData={updateData} />
      </div>
      <ScreenActions back={() => setScreen("source")} next={() => setScreen("lot")} />
    </MobileScaffold>
  );
}

function LotScreen({
  data,
  setScreen,
  updateData,
}: {
  data: DemoData;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="C. Lot details">
      <div className="form-stack">
        <TextField data={data} field="lotCode" label="Lot code" updateData={updateData} />
        <TextField data={data} field="temperature" label="Storage temperature (C)" updateData={updateData} />
        <label className="field-label">
          Note
          <textarea onChange={(event) => updateData("note", event.target.value)} value={data.note} />
        </label>
      </div>
      <ScreenActions back={() => setScreen("catch")} next={() => setScreen("confirm")} />
    </MobileScaffold>
  );
}

function ConfirmScreen({
  data,
  setScreen,
  updateData,
}: {
  data: DemoData;
  setScreen: (screen: DemoScreen) => void;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  const sourceRows = useMemo(
    () => [
      ["Supplier", data.supplier],
      ["Source type", data.sourceType],
      ["Vessel", data.vessel],
    ],
    [data.sourceType, data.supplier, data.vessel],
  );

  const catchRows = useMemo(
    () => [
      ["Catch date", data.catchDate],
      ["Area", data.catchArea],
      ["Method", data.catchMethod],
      ["Fish", data.fishType],
      ["Grade", data.grade],
      ["Quantity", `${data.quantity} kg`],
      ["Lot", data.lotCode],
    ],
    [data.catchArea, data.catchDate, data.catchMethod, data.fishType, data.grade, data.lotCode, data.quantity],
  );

  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="Confirm info">
      <div className="confirm-icon">OK</div>
      <p className="confirm-copy">Review the information before creating the raw material lot.</p>
      <SummaryCard rows={sourceRows} title="Fish source" />
      <SummaryCard rows={catchRows} title="Catch summary" />
      <TextField data={data} field="signatureName" label="Digital signature" updateData={updateData} />
      <ScreenActions back={() => setScreen("lot")} next={() => setScreen("success")} nextLabel="Confirm" />
    </MobileScaffold>
  );
}

function SuccessScreen({ data, setScreen }: { data: DemoData; setScreen: (screen: DemoScreen) => void }) {
  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} title="Completed">
      <div className="success-screen-card">
        <div className="success-badge">OK</div>
        <h2>Source ledger created</h2>
        <p>{data.lotCode} has been captured for demo review.</p>
        <button className="primary-button" onClick={() => setScreen("dashboard")} type="button">
          Back to dashboard
        </button>
      </div>
    </MobileScaffold>
  );
}

function MobileScaffold({
  active,
  children,
  setScreen,
  title,
}: {
  active: "Dashboard" | "Ledgers";
  children: ReactNode;
  setScreen: (screen: DemoScreen) => void;
  title: string;
}) {
  return (
    <div className="mobile-app">
      <header className="mobile-header">
        <button aria-label="Back" onClick={() => setScreen("dashboard")} type="button">
          &lt;
        </button>
        <BrandMark compact />
        <h2>{title}</h2>
      </header>
      <div className="mobile-content">{children}</div>
      <nav className="bottom-nav" aria-label="Mobile demo navigation">
        <button className={active === "Dashboard" ? "active" : ""} onClick={() => setScreen("dashboard")} type="button">
          Dashboard
        </button>
        <button className={active === "Ledgers" ? "active" : ""} onClick={() => setScreen("ledgers")} type="button">
          Ledger
        </button>
        <button type="button">History</button>
        <button type="button">Profile</button>
      </nav>
    </div>
  );
}

function TextField({
  data,
  field,
  label,
  type = "text",
  updateData,
}: {
  data: DemoData;
  field: keyof DemoData;
  label: string;
  type?: string;
  updateData: (field: keyof DemoData, value: string) => void;
}) {
  return (
    <label className="field-label">
      {label}
      <input onChange={(event) => updateData(field, event.target.value)} type={type} value={data[field]} />
    </label>
  );
}

function ScreenActions({
  back,
  next,
  nextLabel = "Continue",
}: {
  back: () => void;
  next: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="screen-actions">
      <button className="secondary-button" onClick={back} type="button">
        Back
      </button>
      <button className="primary-button" onClick={next} type="button">
        {nextLabel}
      </button>
    </div>
  );
}

function SummaryCard({ rows, title }: { rows: string[][]; title: string }) {
  return (
    <article className="summary-card">
      <h3>{title}</h3>
      {rows.map(([label, value]) => (
        <div className="summary-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </article>
  );
}

function MemoryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="memory-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-mark compact" : "brand-mark"} aria-label="TORO">
      T
    </div>
  );
}
