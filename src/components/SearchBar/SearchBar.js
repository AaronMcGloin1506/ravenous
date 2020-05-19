import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            term: '',
            location: '',
            sortBy: 'best_match' 
        };
        
        this.handleLocationChange=this.handleLocationChange.bind(this);
        this.handleTermChange=this.handleTermChange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);

        this.sortByOptions={
            'Best Match': 'best_match',
            'Highest Rated': 'rating',                
            'Most Viewed': 'review_count'
            };
    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        }
        else{
            return '';
        }
    }

    // this method sets the state of the the sorting option. useful when communicating with yelp api in future
    handleSortByChange(sortByOption){
        this.setState({
            sortBy: sortByOption
        });
    }
    //handle change in location related to events being triggered
    handleLocationChange(event){
        this.setState({
            location: event.target.value
        });
    }

    //handle change in term related to events being triggered
    handleTermChange(event){
        this.setState({
            term: event.target.value
        });
    }
    
    handleSearch(event){
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        // to prevent the default action of clicking a link from triggering at the end of the method
        event.preventDefault();
    }

    renderSortByOptions() {
        return Object.keys( this.sortByOptions).map(sortByOption => {
            let sortByOptionValue =  this.sortByOptions[sortByOption];
            // the className will be equal to which value will be chosen and the realated CSS styles will apply.
            // binding this and sortByOptionValue allows us to bind the current value of this (as we usually do in the constructor)
            // but also binding the current sortByOptionValue as the first arguement to the method call, ensuring the method is called with the appropiate value when clicked
            return (
                <li className={this.getSortByClass(sortByOptionValue)}
                    key={sortByOptionValue}
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
             </li>);
        });
    }

    render() {
        return (
            <div class="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit"  onClick={this.handleSearch}>
                    <a>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;