import { type ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import loginBackground from "../../../assets/demo/LOGIN_SCREEN_BACKGROUND.png";
import toroLogo from "../../../assets/demo/TORO_LOGO.png";
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
  vesselRegistration: string;
  captain: string;
  fishingLicense: string;
  imoNumber: string;
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
  vesselRegistration: "VN-12345",
  captain: "Nguyen Van Binh",
  fishingLicense: "LIC-987654",
  imoNumber: "IMO-7654321",
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
    <div className="login-screen" style={{ backgroundImage: `url(${loginBackground})` }}>
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
    <div className="login-screen" style={{ backgroundImage: `url(${loginBackground})` }}>
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
  const summaryCards = [
    ["Receipt time", "08:45 AM", "", "5 lots received", "CLOCK"],
    ["Risk Score", "18", "/100", "Low", "SAFE"],
    ["Status", "92", "/100", "High", "OK"],
    ["Input history", "2", "", "Pending review", "SYNC"],
  ];

  const activities = [
    ["LOT", "Input lot: RAW-2026-0925-001", "25/09/2026 - 08:45 AM", "blue"],
    ["OUT", "Export: LOT-2026-0925-003", "24/09/2026 - 04:30 PM", "orange"],
    ["EDIT", "Edit input: LOT-2026-0925-002", "24/09/2026 - 02:15 PM", "cyan"],
  ];

  return (
    <div className="mobile-app manager-dashboard">
      <div className="manager-scroll">
        <section className="manager-hero">
          <div className="manager-hero-arc" />
          <div className="manager-hero-content">
            <div className="manager-logo-block">
              <BrandMark />
            </div>
            <div className="manager-hero-divider" />
            <div className="manager-greeting">
              <span>Hello,</span>
              <strong>Nguyen Van A</strong>
              <small>Director</small>
            </div>
            <button className="manager-notification" aria-label="Notifications" type="button">
              BEL
              <span />
            </button>
          </div>
        </section>

        <section className="overview-card">
          <div className="section-header">
            <h2>Today overview</h2>
            <button className="date-button" type="button">
              25/09/2026
            </button>
          </div>
          <div className="summary-grid">
            {summaryCards.map(([label, value, suffix, detail, icon]) => (
              <article className="summary-stat-card" key={label}>
                <div className="summary-top-row">
                  <span>{label}</span>
                  <b className={icon === "SYNC" ? "summary-icon warn" : "summary-icon"}>{icon}</b>
                </div>
                <div className="metric-row">
                  <strong>{value}</strong>
                  {suffix ? <em>{suffix}</em> : null}
                </div>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="activity-header">
          <h2>Recent activity</h2>
          <button type="button">View all</button>
        </div>

        <div className="activity-list">
          {activities.map(([icon, title, time, tone]) => (
            <article className="activity-card" key={title}>
              <span className={`activity-icon ${tone}`}>{icon}</span>
              <div>
                <strong>{title}</strong>
                <small>{time}</small>
              </div>
            </article>
          ))}
        </div>

        <section className="chart-card">
          <h2>Input / Output (last 7 days)</h2>
          <div className="legend-row">
            <span>
              <i className="legend-dot inbound" /> Input (kg)
            </span>
            <span>
              <i className="legend-dot outbound" /> Output (kg)
            </span>
          </div>
          <div className="chart">
            {[42, 56, 66, 64, 68, 82, 98, 64].map((inValue, index) => (
              <div className="chart-column" key={`${inValue}-${index}`}>
                <div className="bar-group">
                  <i className="bar inbound-bar" style={{ height: inValue }} />
                  <i className="bar outbound-bar" style={{ height: [25, 38, 52, 72, 45, 56, 65, 68][index] }} />
                </div>
                <span>{["19/09", "20/09", "21/09", "22/09", "22/09", "23/09", "24/09", "25/09"][index]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <BottomNav active="Dashboard" setScreen={setScreen} />
    </div>
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
  const vesselDetails: { label: string; field: keyof DemoData }[] = [
    { label: "Vessel registration", field: "vesselRegistration" },
    { label: "Captain", field: "captain" },
    { label: "Fishing method", field: "catchMethod" },
    { label: "Fishing license", field: "fishingLicense" },
    { label: "IMO Number", field: "imoNumber" },
  ];

  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} step={1} title="Source ledger">
      <div className="source-form-content">
        <div className="section-intro">
          <h2>THONG TIN NGUON CA</h2>
          <p>Ghi nhan nguon nguyen lieu va tao lo ca nguyen lieu ban dau</p>
        </div>

        <h3 className="group-title">A. Thong tin nguon ca</h3>

        <FieldLabel label="Nha cung cap (Supplier)" required />
        <div className="search-input">
          <span>SEA</span>
          <input
            onChange={(event) => updateData("supplier", event.target.value)}
            placeholder="Tim kiem nha cung cap..."
            value={data.supplier}
          />
          <b>v</b>
        </div>

        <div className="select-card source-select-card">
          <span className="select-icon-box">DOC</span>
          <div>
            <input onChange={(event) => updateData("supplier", event.target.value)} value={data.supplier} />
            <small>SUP-001</small>
          </div>
          <b>&gt;</b>
        </div>

        <FieldLabel label="Loai nguon" required />
        <div className="radio-row">
          {["Fishing vessel", "Farm"].map((option) => (
            <button
              className={data.sourceType === option ? "radio-option active" : "radio-option"}
              key={option}
              onClick={() => updateData("sourceType", option)}
              type="button"
            >
              <span />
              {option}
            </button>
          ))}
        </div>

        <FieldLabel label="Tau ca" required />
        <div className="select-input">
          <input
            onChange={(event) => updateData("vessel", event.target.value)}
            placeholder="Tim kiem tau ca..."
            value={data.vessel}
          />
          <b>v</b>
        </div>

        <div className="info-panel">
          <div className="info-header">
            <span className="info-icon-box">ANC</span>
            <strong>Thong tin tau ca</strong>
          </div>
          <div className="info-divider" />
          {vesselDetails.map((detail) => (
            <div className="info-row" key={detail.label}>
              <label>{detail.label}</label>
              <input onChange={(event) => updateData(detail.field, event.target.value)} value={data[detail.field]} />
            </div>
          ))}
        </div>
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
  const catchFields: { field: keyof DemoData; label: string; suffix?: string; select?: boolean; type?: string }[] = [
    { field: "catchDate", label: "Ngay danh bat", type: "date" },
    { field: "catchArea", label: "Khu vuc danh bat" },
    { field: "catchMethod", label: "Phuong phap danh bat", select: true },
    { field: "fishType", label: "Loai ca", select: true },
    { field: "grade", label: "Phan loai chat luong (Grade)", select: true },
    { field: "quantity", label: "So luong nguyen lieu (kg)", suffix: "kg" },
  ];

  return (
    <MobileScaffold active="Ledgers" setScreen={setScreen} step={2} title="Source ledger">
      <div className="catch-form-content">
        <h2 className="catch-title">B. Thong tin danh bat</h2>

        {catchFields.map((field) => (
          <div className="field-block" key={field.field}>
            <FieldLabel label={field.label} required />
            <div className="rn-input">
              {field.type === "date" ? <span className="leading-symbol">CAL</span> : null}
              <input
                onChange={(event) => updateData(field.field, event.target.value)}
                type={field.type ?? "text"}
                value={data[field.field]}
              />
              {field.select ? <b>v</b> : null}
              {field.suffix ? <em>{field.suffix}</em> : null}
            </div>
          </div>
        ))}
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
    <MobileScaffold active="Ledgers" setScreen={setScreen} step={3} title="Source ledger">
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
    <MobileScaffold active="Ledgers" setScreen={setScreen} step={4} title="Source ledger">
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
  step,
  title,
}: {
  active: "Dashboard" | "Ledgers";
  children: ReactNode;
  setScreen: (screen: DemoScreen) => void;
  step?: number;
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
      {step ? <LedgerStepper activeStep={step} setScreen={setScreen} /> : null}
      <div className="mobile-content">{children}</div>
      <BottomNav active={active} setScreen={setScreen} />
    </div>
  );
}

function LedgerStepper({ activeStep, setScreen }: { activeStep: number; setScreen: (screen: DemoScreen) => void }) {
  const steps: { label: string; screen: DemoScreen }[] = [
    { label: "THONG TIN\nNGUON CA", screen: "source" },
    { label: "THONG TIN\nLO", screen: "catch" },
    { label: "KIEM TRA\nXAC NHAN", screen: "lot" },
    { label: "KY & GHI\nBLOCKCHAIN", screen: "confirm" },
  ];

  return (
    <div className="ledger-stepper">
      <div className="stepper-connector" />
      {steps.map((stepItem, index) => {
        const number = index + 1;
        const active = number === activeStep;
        const completed = number < activeStep;

        return (
          <button className="step-item" key={stepItem.screen} onClick={() => setScreen(stepItem.screen)} type="button">
            <span className={active || completed ? "step-circle active" : "step-circle"}>
              {completed ? "OK" : number}
            </span>
            <b className={active || completed ? "active" : ""}>{stepItem.label}</b>
          </button>
        );
      })}
    </div>
  );
}

function BottomNav({
  active,
  setScreen,
}: {
  active: "Dashboard" | "Ledgers";
  setScreen: (screen: DemoScreen) => void;
}) {
  return (
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
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="rn-field-label">
      {label} {required ? <span>*</span> : null}
    </label>
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
      <img alt="TORO" src={toroLogo} />
    </div>
  );
}
