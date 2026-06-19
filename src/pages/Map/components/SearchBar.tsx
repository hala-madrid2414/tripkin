import { hotSearchKeywords } from '../data/mapData'
import type { Spot } from '../types'
import { CloseIcon, LayersIcon, SearchIcon } from './MapIcons'
import styles from '../Map.module.less'

interface SearchBarProps {
  query: string
  results: Spot[]
  onQueryChange: (query: string) => void
  onResultClick: (spotId: string) => void
  onKeywordClick: (keyword: string) => void
  onLayerClick: () => void
}

function SearchBar({
  query,
  results,
  onQueryChange,
  onResultClick,
  onKeywordClick,
  onLayerClick,
}: SearchBarProps) {
  const hasQuery = query.trim().length > 0

  return (
    <header className={styles.topBar}>
      <div className={styles.searchWrap}>
        <SearchIcon className={styles.searchIcon} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className={styles.searchInput}
          placeholder="搜索目的地 / 城市 / 景点"
          aria-label="搜索目的地、城市或景点"
          inputMode="search"
        />
        {hasQuery && (
          <button
            type="button"
            className={styles.clearSearch}
            onClick={() => onQueryChange('')}
            aria-label="清空搜索"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <button
        type="button"
        className={styles.layerButton}
        onClick={onLayerClick}
        aria-label="打开图层选择"
      >
        <LayersIcon />
        <span>图层</span>
      </button>

      {(hasQuery || results.length > 0) && (
        <section className={styles.searchPanel} aria-label="搜索结果">
          {hasQuery ? (
            results.length > 0 ? (
              <div className={styles.resultList}>
                {results.slice(0, 5).map((spot) => (
                  <button
                    type="button"
                    key={spot.id}
                    className={styles.searchResult}
                    onClick={() => onResultClick(spot.id)}
                  >
                    <span className={styles.resultPin} />
                    <span>
                      <strong>{spot.name}</strong>
                      <small>{spot.subtitle}</small>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.emptySearch}>暂时没有找到相关地点</p>
            )
          ) : null}

          <div className={styles.hotSearch}>
            <p>热门搜索</p>
            <div>
              {hotSearchKeywords.slice(0, 10).map((keyword) => (
                <button
                  type="button"
                  key={keyword}
                  onClick={() => onKeywordClick(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </header>
  )
}

export default SearchBar
