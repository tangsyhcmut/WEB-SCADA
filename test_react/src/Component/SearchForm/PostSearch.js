import { useState,useEffect} from 'react'
import PropTypes from 'prop-types'

PostSearch.propTypes = {
    onSubmit:PropTypes.func,
};
PostSearch.defaultProps = {
    onSubmit:null,
}

function PostSearch(props) {
    const {onSubmit}=props;
    const { searchTerm, setSearchTerm}=useState('');

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);

        if(!onSubmit) return;
        const formValues ={
            searchTerm: e.target.value,

        };
        onSubmit(formValues);
    }
    return (
        <form>
            <input type="text" 
                    value={searchTerm}
                    onChange={handleSearchTermChange}
            />
        </form>
    )
}


export default PostSearch

