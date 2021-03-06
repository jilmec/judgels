package judgels.uriel.api.contest.supervisor;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.util.Map;
import judgels.jophiel.api.profile.Profile;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ImmutableContestSupervisorsDeleteResponse.class)
public interface ContestSupervisorsDeleteResponse {
    Map<String, Profile> getDeletedSupervisorProfilesMap();

    class Builder extends ImmutableContestSupervisorsDeleteResponse.Builder {}
}
