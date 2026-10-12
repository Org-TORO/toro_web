import toroLogo from "../../assets/demo/TORO_LOGO.png";
import "./ledger-dashboard.page.css";

type StatCard = {
  label: string;
  value: string;
  helper: string;
  tone: "success" | "danger" | "neutral";
};

type ScoreCard = {
  label: string;
  value: number;
  caption: string;
  level: string;
  tone: "risk" | "trust";
};

type LedgerRow = {
  id: string;
  date: string;
  batch: string;
  species: string;
  quantity: string;
  staff: string;
  role: string;
  status: "IN_PROGRESS" | "CREATED" | "COMPLETED" | "ASSIGNED";
  updated: string;
  action: string;
};

type Activity = {
  icon: string;
  title: string;
  meta: string;
};

const stats: StatCard[] = [
  { label: "Tổng Ledger", value: "24", helper: "4 tháng này", tone: "success" },
  { label: "Chờ phân công", value: "5", helper: "Cần xử lý", tone: "danger" },
  { label: "Đang thực hiện", value: "12", helper: "Main Staff đang nhập", tone: "neutral" },
  { label: "Đã hoàn thành", value: "7", helper: "2 tuần này", tone: "success" },
];

const scores: ScoreCard[] = [
  { label: "Risk Score - Team Main Staff", value: 18, caption: "Mức rủi ro trung bình", level: "Thấp", tone: "risk" },
  { label: "Trust Score - Team Main Staff", value: 92, caption: "Mức độ tin cậy trung bình", level: "Cao", tone: "trust" },
];

const ledgerRows: LedgerRow[] = [
  {
    id: "LED-2026-001",
    date: "29/09/2026 09:00",
    batch: "RAW-2026-0529-003",
    species: "Skipjack Tuna",
    quantity: "1,800 kg",
    staff: "Nguyễn Văn A",
    role: "Main Staff",
    status: "IN_PROGRESS",
    updated: "10 phút trước",
    action: "Xem",
  },
  {
    id: "LED-2026-002",
    date: "29/09/2026 08:40",
    batch: "RAW-2026-0529-004",
    species: "Yellowfin Tuna",
    quantity: "2,500 kg",
    staff: "—",
    role: "Chưa phân công",
    status: "CREATED",
    updated: "25 phút trước",
    action: "Phân công",
  },
  {
    id: "LED-2026-003",
    date: "28/09/2026 15:20",
    batch: "RAW-2026-0528-012",
    species: "Swordfish",
    quantity: "2,200 kg",
    staff: "Lê Thị B",
    role: "Main Staff",
    status: "COMPLETED",
    updated: "Hôm qua",
    action: "Xem",
  },
  {
    id: "LED-2026-004",
    date: "27/09/2026 11:00",
    batch: "RAW-2026-0527-008",
    species: "Yellowfin Tuna",
    quantity: "2,000 kg",
    staff: "Phạm Văn C",
    role: "Main Staff",
    status: "ASSIGNED",
    updated: "Hôm qua",
    action: "Xem",
  },
];

const activities: Activity[] = [
  { icon: "add", title: "Tạo Ledger LED-2026-002", meta: "25 phút trước - Trần Thị Mai" },
  { icon: "person", title: "Phân công Nguyễn Văn A", meta: "40 phút trước - LED-2026-001" },
  { icon: "check", title: "Hoàn thành LED-2026-003", meta: "Hôm qua - Lê Thị B" },
  { icon: "priority_high", title: "Cảnh báo Risk Score tăng", meta: "Hôm qua - Main Staff team" },
];

const navItems = [
  { label: "User Management", icon: "group" },
  { label: "Organization Management", icon: "business" },
  { label: "Ledger Management", icon: "receipt_long" },
];

const statusLabels: Record<LedgerRow["status"], string> = {
  IN_PROGRESS: "IN_PROGRESS",
  CREATED: "CREATED",
  COMPLETED: "COMPLETED",
  ASSIGNED: "ASSIGNED",
};

export default function LedgerDashboardPage() {
  return (
    <main className="ledger-dashboard-page">
      <aside className="ledger-sidebar" aria-label="Main navigation">
        <a className="ledger-brand" href="/" aria-label="TORO home">
          <span className="ledger-brand-mark">
            <img alt="" src={toroLogo} />
          </span>
          <span>
            <strong>TORO</strong>
            <small>TRACEABILITY PLATFORM</small>
          </span>
        </a>

        <nav className="ledger-nav">
          {navItems.map((item) => (
            <a
              className={item.label === "Ledger Management" ? "ledger-nav-item active" : "ledger-nav-item"}
              href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
              key={item.label}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <section className="ledger-main">
        <header className="ledger-header">
          <div>
            <h1>Ledger Management</h1>
            <p>Tạo, phân công và theo dõi các sổ theo dõi trong quy trình Human Oracle.</p>
          </div>
          <div className="ledger-actions">
            <button className="secondary-action" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">
                refresh
              </span>
              Làm mới
            </button>
            <button className="primary-action" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">
                add
              </span>
              Tạo Ledger
            </button>
          </div>
        </header>

        <section className="ledger-stat-grid" aria-label="Ledger summary">
          {stats.map((stat) => (
            <article className="metric-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small className={stat.tone}>
                {stat.tone === "success" ? "↑ " : null}
                {stat.helper}
              </small>
            </article>
          ))}
        </section>

        <section className="score-grid" aria-label="Team scores">
          {scores.map((score) => (
            <article className="score-card" key={score.label}>
              <div className="score-heading">
                <h2>{score.label}</h2>
                <strong>{score.level}</strong>
              </div>
              <p>
                <b>{score.value}</b>
                <span>/ 100</span>
              </p>
              <small>{score.caption}</small>
              <div className="score-track" aria-hidden="true">
                <span className={score.tone} style={{ width: `${score.value}%` }} />
              </div>
            </article>
          ))}
        </section>

        <div className="dashboard-content-grid">
          <section className="ledger-table-card">
            <div className="table-heading">
              <h2>Danh sách Ledger</h2>
              <button className="ghost-action" type="button">
                <span className="material-symbols-outlined" aria-hidden="true">
                  add
                </span>
                Tạo mới
              </button>
            </div>
            <div className="filter-row">
              <label>
                <span className="visually-hidden">Tìm kiếm Ledger</span>
                <input placeholder="Tìm Ledger, mã lô, loài cá..." />
              </label>
              <button type="button">Tất cả trạng thái</button>
              <button type="button">30 ngày gần nhất</button>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Ledger</th>
                    <th>Batch</th>
                    <th>Main Staff</th>
                    <th>Trạng thái</th>
                    <th>Cập nhật</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {ledgerRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{row.id}</strong>
                        <small>{row.date}</small>
                      </td>
                      <td>
                        <strong>{row.batch}</strong>
                        <small>
                          {row.species} · {row.quantity}
                        </small>
                      </td>
                      <td>
                        <strong>{row.staff}</strong>
                        <small>{row.role}</small>
                      </td>
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase()}`}>{statusLabels[row.status]}</span>
                      </td>
                      <td>{row.updated}</td>
                      <td>
                        <button className="row-action" type="button">
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="ledger-activity-card" aria-label="Recent activity">
            <h2>Hoạt động gần đây</h2>
            <div className="ledger-activity-list">
              {activities.map((activity) => (
                <article className="ledger-activity-item" key={activity.title}>
                  <span className="ledger-activity-icon material-symbols-outlined" aria-hidden="true">
                    {activity.icon}
                  </span>
                  <div>
                    <strong>{activity.title}</strong>
                    <small>{activity.meta}</small>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
