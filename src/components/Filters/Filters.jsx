import "./Filters.scss"

function Filters(){
    return(
        <div className="filters">
            <span>Filter by:</span>
            <div className="filter-button">Progress</div>
            <div className="filter-button">Status</div>
        </div>
    )
}

export default Filters