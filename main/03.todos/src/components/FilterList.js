/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';

import FilterContainer from '../containers/FilterContainer';

const FILTERS = [
    {CLASS_NAME: 'all', TEXT: 'All', FILTER: 'SHOW_ALL'},
    {CLASS_NAME: 'active', TEXT: 'Active', FILTER: 'SHOW_ACTIVE'},
    {CLASS_NAME: 'completed', TEXT: 'Completed', FILTER: 'SHOW_COMPLETED'}
];

const Footer = () => (
    <div>
        <h3>FilterList</h3>
        <ul>
            {
                FILTERS.map(FILTER => (
                    <li className={FILTER.CLASS_NAME}>
                        <FilterContainer
                            filter={FILTER.FILTER}
                        >
                            {FILTER.TEXT}
                        </FilterContainer>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default Footer;