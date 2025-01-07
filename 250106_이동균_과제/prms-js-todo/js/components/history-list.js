import { renderCurrentAsset } from "../components/current-asset";
import { store, removeHistory } from "../store";

const $sectionHistory = document.querySelector(".history");

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(dateid, itemid);
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

export function renderHistoryList() {
  // TODO: 데이터 매핑
  // TODO: 오름차순으로 목록 나열
  // TODO: 항목의 시간 포맷 변경: `HH:mm`
  // TODO: 금액 콤마 포맷 맞추기

  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      if (!detail?.length) return "";

      return `
      <article class="history-per-day">
        <p class="history-date">${date}</p>
        ${detail
          .map(
            ({ description, category, amount, fundsAtTheTime, createAt }) => {
              return `
                <section class="history-item-column">
                  <div class="history-detail">
                    <div class="history-detail-row history-detail-title">
                      <p>${description}</p>
                    </div>
                    <div class="history-detail-row history-detail-subtitle">
                      <p>${category}</p>
                      <p>${amount}<span>원</span></p>
                    </div>
                  </div>
                  <div class="delete-section">
                    <button class="delete-button">🗑</button>
                  </div>
                </section>
                <section class="history-item-caption">
                  <span>남은 자산</span>
                  <span>${fundsAtTheTime}</span>
                  <span>원</span>
                </section>
              `;
            }
          )
          .join("")}
      </article>
    `;
    })
    .join("");
}
