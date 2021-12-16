import styled from 'styled-components';

const Style = styled.div`
.leaflet-container{
    height:88vh;
}
.shapeMap{
    position: fixed;
    top:96px;
    right:0;
}
.shape-info {
    transition:0.2s;
    &:hover{
        background: #efefef;
    }
    svg{
    cursor:pointer;
    }
}
`

export default Style;