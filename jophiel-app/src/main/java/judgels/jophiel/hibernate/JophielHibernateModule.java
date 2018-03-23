package judgels.jophiel.hibernate;

import dagger.Module;
import dagger.Provides;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import javax.inject.Singleton;
import judgels.jophiel.hibernate.HibernateDaos.SessionHibernateDao;
import judgels.jophiel.hibernate.HibernateDaos.UserProfileHibernateDao;
import judgels.jophiel.hibernate.HibernateDaos.UserRegistrationEmailHibernateDao;
import judgels.jophiel.hibernate.HibernateDaos.UserResetPasswordHibernateDao;
import judgels.jophiel.legacy.session.LegacySessionDao;
import judgels.jophiel.legacy.session.LegacySessionHibernateDao;
import judgels.jophiel.persistence.Daos.AdminRoleDao;
import judgels.jophiel.persistence.Daos.SessionDao;
import judgels.jophiel.persistence.Daos.UserProfileDao;
import judgels.jophiel.persistence.Daos.UserRegistrationEmailDao;
import judgels.jophiel.persistence.Daos.UserResetPasswordDao;
import judgels.jophiel.persistence.UserResetPasswordRawDao;
import judgels.jophiel.user.UserDao;
import org.hibernate.SessionFactory;

@Module
public class JophielHibernateModule {
    private final HibernateBundle<?> hibernateBundle;
    private final SessionFactory sessionFactory;

    public JophielHibernateModule(HibernateBundle<?> hibernateBundle) {
        this.hibernateBundle = hibernateBundle;
        this.sessionFactory = hibernateBundle.getSessionFactory();
    }

    @Provides
    SessionFactory sessionFactory() {
        return sessionFactory;
    }

    @Provides
    @Singleton
    UnitOfWorkAwareProxyFactory unitOfWorkAwareProxyFactory() {
        return new UnitOfWorkAwareProxyFactory(hibernateBundle);
    }

    @Provides
    AdminRoleDao adminRoleDao(HibernateDaos.AdminRoleHibernateDao dao) {
        return dao;
    }

    @Provides
    LegacySessionDao legacySessionDao(LegacySessionHibernateDao dao) {
        return dao;
    }

    @Provides
    SessionDao sessionDao(SessionHibernateDao dao) {
        return dao;
    }

    @Provides
    UserDao userDao(UserHibernateDao dao) {
        return dao;
    }

    @Provides
    UserProfileDao userProfileDao(UserProfileHibernateDao dao) {
        return dao;
    }

    @Provides
    UserRegistrationEmailDao userRegistrationEmailDao(UserRegistrationEmailHibernateDao dao) {
        return dao;
    }

    @Provides
    UserResetPasswordDao userResetPasswordDao(UserResetPasswordHibernateDao dao) {
        return dao;
    }

    @Provides
    UserResetPasswordRawDao userResetPasswordRawDao(UserResetPasswordRawHibernateDao dao) {
        return dao;
    }
}
