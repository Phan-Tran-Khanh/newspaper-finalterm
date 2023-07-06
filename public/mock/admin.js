console.log("admin mock data loaded");
articles.forEach(article => {
    newsTable.push({
      id: article.id,
      title: article.title,
      viewCount: article.viewCount,
      status: article.status,
    });
  });
  