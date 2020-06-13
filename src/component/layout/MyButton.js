import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default ({children , tip , onClick , className , color , component , to , loading}) =>(
    <Tooltip title={tip}>
        <IconButton onClick={onClick} component={component} to={to} className={className} style={{color:`${color}`}} disabled={loading}>
            {children}
        </IconButton>
    </Tooltip>
);