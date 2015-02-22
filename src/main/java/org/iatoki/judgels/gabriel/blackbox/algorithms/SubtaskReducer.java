package org.iatoki.judgels.gabriel.blackbox.algorithms;

import com.google.common.collect.Lists;
import org.iatoki.judgels.gabriel.blackbox.NormalVerdict;
import org.iatoki.judgels.gabriel.blackbox.ReductionException;
import org.iatoki.judgels.gabriel.blackbox.ScoringVerdict;
import org.iatoki.judgels.gabriel.blackbox.Subtask;
import org.iatoki.judgels.gabriel.blackbox.SubtaskResult;
import org.iatoki.judgels.gabriel.blackbox.TestCaseResult;

import java.util.List;

public final class SubtaskReducer extends AbstractReducer {
    @Override
    public SubtaskResult reduceTestCases(List<TestCaseResult> testCaseResults, Subtask subtask) throws ReductionException {
        if (testCaseResults.isEmpty()) {
            return new SubtaskResult(ScoringVerdict.OK, 0.0);
        }

        double score = subtask.getPoints();
        for (TestCaseResult result : testCaseResults) {
            NormalVerdict verdict = result.getVerdict();
            if (verdict != ScoringVerdict.ACCEPTED) {
                score = 0.0;
            }
        }
        return new SubtaskResult(getWorstVerdict(Lists.transform(testCaseResults, r -> r.getVerdict())), score);
    }
}
