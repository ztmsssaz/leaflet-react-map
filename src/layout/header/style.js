import styled from 'styled-components';

const theme = {
    black: '#000',
    white: '#fff',
    lightGray: '#abb7c4',
}

const Style = styled.div`
header.mainHeader{
    position: fixed;
    top:0;
    left:0;
    z-index:900;
    width: 100%;
    min-height:12vh;
    min-height:96px;
    background-color: ${theme.white};
    .logo img{
        width: 35px;
        height: auto;
    }
    .navbar-default li a{
        font-weight:bold;
        color: ${theme.black};
        &:hover{
            color: ${theme.lightGray}
        }
    }
}
}
`
export default Style;
