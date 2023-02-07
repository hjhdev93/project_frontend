import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import PostList from "./PostList";

export default function PageNation(props: { loadPostByPage: any }) {
  const MAX_PAGE = 10;
  const [page, SetPage] = useState<number>(1);
  const [totalPage, SetTotalPage] = useState<number>(1);
  const [pageList, SetPageList] = useState<number[]>([]);

  useEffect(() => {
    SetTotalPage(Math.ceil(5));
    sortPageNumber();
  }, []);

  const sortPageNumber = () => {
    for (let i = page; i <= MAX_PAGE && i <= totalPage; i++) {
      SetPageList([...pageList, i]);
    }
  };

  //  다픔 페이지 섹션으로 이동
  const nextPage = () => {
    if (page === totalPage) return;
    SetPageList([]);
    SetPage(page + 1);
    sortPageNumber();
  };

  //  이전 페이지 섹션으로 이동
  const beforePage = () => {
    if (page === 1) return;
    SetPageList([]);
    SetPage(page - 1);
    sortPageNumber();
  };

  return (
    <PageNationContainer>
      <PageNextBtn onClick={nextPage}>다음</PageNextBtn>
      <>
        {pageList
          ? pageList.map((num) => {
              {
                console.log(num);
              }
              return (
                <PageNumBtn
                  key={num}
                  onClick={() => {
                    props.loadPostByPage(num);
                  }}
                >
                  {num}
                </PageNumBtn>
              );
            })
          : null}
      </>
      <PageBeforeBtn onClick={beforePage}>이전</PageBeforeBtn>
    </PageNationContainer>
  );
}

export const PageNationContainer = styled.div``;

export const PageNextBtn = styled.button``;

export const PageBeforeBtn = styled.button``;

export const PageNumBtn = styled.button``;
