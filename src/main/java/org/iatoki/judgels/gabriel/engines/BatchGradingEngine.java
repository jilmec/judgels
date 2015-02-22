package org.iatoki.judgels.gabriel.engines;

import com.google.common.collect.ImmutableList;
import com.google.gson.Gson;
import org.apache.commons.io.FileUtils;
import org.iatoki.judgels.gabriel.GradingConfig;
import org.iatoki.judgels.gabriel.GradingLanguage;
import org.iatoki.judgels.gabriel.GradingLanguageRegistry;
import org.iatoki.judgels.gabriel.blackbox.BlackBoxGradingConfig;
import org.iatoki.judgels.gabriel.blackbox.BlackBoxGradingEngine;
import org.iatoki.judgels.gabriel.blackbox.Compiler;
import org.iatoki.judgels.gabriel.blackbox.Evaluator;
import org.iatoki.judgels.gabriel.blackbox.PreparationException;
import org.iatoki.judgels.gabriel.blackbox.Reducer;
import org.iatoki.judgels.gabriel.blackbox.Sandbox;
import org.iatoki.judgels.gabriel.blackbox.SandboxFactory;
import org.iatoki.judgels.gabriel.blackbox.Scorer;
import org.iatoki.judgels.gabriel.blackbox.TestGroup;
import org.iatoki.judgels.gabriel.blackbox.algorithms.BatchEvaluator;
import org.iatoki.judgels.gabriel.blackbox.algorithms.CustomScorer;
import org.iatoki.judgels.gabriel.blackbox.algorithms.DiffScorer;
import org.iatoki.judgels.gabriel.blackbox.algorithms.SimpleReducer;
import org.iatoki.judgels.gabriel.blackbox.algorithms.SingleSourceFileCompiler;
import org.iatoki.judgels.gabriel.blackbox.configs.BatchGradingConfig;
import org.iatoki.judgels.gabriel.languages.CppElevenGradingLanguage;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public final class BatchGradingEngine extends BlackBoxGradingEngine {

    private Compiler compiler;
    private Evaluator evaluator;
    private Scorer scorer;
    private Reducer reducer;

    private Sandbox compilerSandbox;
    private Sandbox evaluatorSandbox;
    private Sandbox scorerSandbox;

    @Override
    protected void prepare(SandboxFactory sandboxFactory, File workingDir, BlackBoxGradingConfig config, GradingLanguage language, Map<String, File> sourceFiles, Map<String, File> helperFiles) throws PreparationException {

        File sourceFile = sourceFiles.get(config.getSourceFileFields().keySet().iterator().next());
        BatchGradingConfig castConfig = (BatchGradingConfig) config;

        File compilationDir;
        File evaluationDir;
        File scoringDir;

        try {
            compilationDir = new File(workingDir, "compilation");
            FileUtils.forceMkdir(compilationDir);
            evaluationDir = new File(workingDir, "evaluation");
            FileUtils.forceMkdir(evaluationDir);
            scoringDir = new File(workingDir, "scoring");
            FileUtils.forceMkdir(scoringDir);
        } catch (IOException e) {
            throw new PreparationException("Cannot make directories inside " + workingDir.getAbsolutePath());
        }

        compilerSandbox = sandboxFactory.newSandbox();
        compiler = new SingleSourceFileCompiler(compilerSandbox, compilationDir, language, "source", sourceFile, 10000, 1024 * 1024);

        evaluatorSandbox = sandboxFactory.newSandbox();
        evaluator = new BatchEvaluator(evaluatorSandbox, compilationDir, evaluationDir, language, sourceFile, castConfig.getTimeLimitInMilliseconds(), castConfig.getMemoryLimitInKilobytes());

        if (castConfig.getCustomScorer() != null) {
            scorerSandbox = sandboxFactory.newSandbox();
            GradingLanguage cppLanguage = GradingLanguageRegistry.getInstance().getLanguage("CppEleven");
            File scorerFile = helperFiles.get(castConfig.getCustomScorer());
            scorer = new CustomScorer(scorerSandbox, evaluationDir, scoringDir, cppLanguage, scorerFile, 10000, 1024 * 1024, 10000, 1024 * 1024);
        } else {
            scorer = new DiffScorer(evaluationDir);
        }

        reducer = new SimpleReducer();
    }

    @Override
    protected org.iatoki.judgels.gabriel.blackbox.Compiler getCompiler() {
        return compiler;
    }

    @Override
    protected Evaluator getEvaluator() {
        return evaluator;
    }

    @Override
    protected Scorer getScorer() {
        return scorer;
    }

    @Override
    protected Reducer getReducer() {
        return reducer;
    }

    @Override
    public String getName() {
        return "Batch";
    }

    @Override
    public GradingConfig createDefaultGradingConfig() {
        return new BatchGradingConfig(2000, 65536, ImmutableList.of(new TestGroup(0, ImmutableList.of()), new TestGroup(-1, ImmutableList.of())), null);
    }

    @Override
    public GradingConfig createGradingConfigFromJson(String json) {
        return new Gson().fromJson(json, BatchGradingConfig.class);
    }

    @Override
    public void cleanUp() {
        if (compilerSandbox != null) {
            compilerSandbox.cleanUp();
        }
        if (evaluatorSandbox != null) {
            evaluatorSandbox.cleanUp();
        }
        if (scorerSandbox != null) {
            scorerSandbox.cleanUp();
        }
    }
}
