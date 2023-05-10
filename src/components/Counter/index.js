import {Component} from 'react'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import KitchenContext from '../../context/KitchenContext'

import './index.css'

const totalPages = 4
const Page = 1

class Counter extends Component {
  state = {currentPage: Page}

  onIncrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        pre => ({currentPage: pre.currentPage + 1}),
        pageChangeFunction(currentPage + 1),
      )
    }
  }

  onDecrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        pre => ({currentPage: pre.currentPage - 1}),
        pageChangeFunction(currentPage - 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <KitchenContext.Consumer>
        {value => {
          const {activeTheme} = value
          const itemHeading = activeTheme === 'light' ? ' #183b56' : '#f1f1f1'
          const itemPara = activeTheme === 'light' ? '#64748b' : '#94a3b8'

          return (
            <div className="page-container">
              <button
                type="button"
                testid="pagination-left-button"
                className="page-btn"
                onClick={this.onDecrement}
                style={{color: `${itemPara}`}}
              >
                <AiOutlineLeft className="arrow-icon" />
              </button>
              <div>
                <p className="page-text" style={{color: `${itemHeading}`}}>
                  <span testid="active-page-number">{currentPage}</span> of{' '}
                  {totalPages}
                </p>
              </div>
              <button
                type="button"
                testid="pagination-right-button"
                className="page-btn"
                onClick={this.onIncrement}
                style={{color: `${itemPara}`}}
              >
                <AiOutlineRight className="arrow-icon" />
              </button>
            </div>
          )
        }}
      </KitchenContext.Consumer>
    )
  }
}

export default Counter
