package judgels.jerahmeel.hibernate;

import java.util.List;
import java.util.Optional;
import javax.inject.Inject;
import judgels.jerahmeel.persistence.ChapterProblemDao;
import judgels.jerahmeel.persistence.ChapterProblemModel;
import judgels.jerahmeel.persistence.ChapterProblemModel_;
import judgels.persistence.FilterOptions;
import judgels.persistence.api.SelectionOptions;
import judgels.persistence.hibernate.HibernateDao;
import judgels.persistence.hibernate.HibernateDaoData;
import judgels.sandalphon.api.problem.ProblemType;

public class ChapterProblemHibernateDao extends HibernateDao<ChapterProblemModel> implements ChapterProblemDao {
    @Inject
    public ChapterProblemHibernateDao(HibernateDaoData data) {
        super(data);
    }

    @Override
    public Optional<ChapterProblemModel> selectByChapterJidAndProblemJid(String chapterJid, String problemJid) {
        return selectByFilter(new FilterOptions.Builder<ChapterProblemModel>()
                .putColumnsEq(ChapterProblemModel_.chapterJid, chapterJid)
                .putColumnsEq(ChapterProblemModel_.problemJid, problemJid)
                .putColumnsEq(ChapterProblemModel_.status, "VISIBLE")
                .build());
    }

    @Override
    public Optional<ChapterProblemModel> selectByChapterJidAndProblemAlias(String chapterJid, String problemAlias) {
        return selectByFilter(new FilterOptions.Builder<ChapterProblemModel>()
                .putColumnsEq(ChapterProblemModel_.chapterJid, chapterJid)
                .putColumnsEq(ChapterProblemModel_.alias, problemAlias)
                .putColumnsEq(ChapterProblemModel_.status, "VISIBLE")
                .build());
    }

    @Override
    public List<ChapterProblemModel> selectAllByChapterJid(String chapterJid, SelectionOptions options) {
        return selectAll(new FilterOptions.Builder<ChapterProblemModel>()
                .putColumnsEq(ChapterProblemModel_.chapterJid, chapterJid)
                .putColumnsEq(ChapterProblemModel_.status, "VISIBLE")
                .build(), options);
    }

    @Override
    public List<ChapterProblemModel> selectAllBundleByChapterJid(String chapterJid, SelectionOptions options) {
        return selectAll(new FilterOptions.Builder<ChapterProblemModel>()
                .putColumnsEq(ChapterProblemModel_.chapterJid, chapterJid)
                .putColumnsEq(ChapterProblemModel_.status, "VISIBLE")
                .putColumnsEq(ChapterProblemModel_.type, ProblemType.BUNDLE.name())
                .build(), options);
    }
}