import styled from 'styled-components';

const IndexPage = () => {
  return (
    <Container>
      <Box>
        <Title>HTML5 Canvas 테스트</Title>
        <Text>HTML5 Canvas 2D 드로잉을 테스트하는 페이지입니다.</Text>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;
const Box = styled.div`
  padding: 50px 0;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 36px;
  line-height: 40px;
  font-weight: bold;
`;
const Text = styled.p`
  font-size: 20px;
  line-height: 24px;
  margin-top: 20px;
`;

export { IndexPage };
